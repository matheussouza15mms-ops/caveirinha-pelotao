# Supabase + Google Sheets (Mapa da Forca)

Guia consolidado com SQL e Apps Script usados para:
- manter `efetivo` consistente
- sincronizar alteracoes do `quadro_organizacional`
- alimentar Google Sheets
- gerar PDF do mapa da forca

## 1) SQL consolidado (Supabase)

Rode no SQL Editor.

```sql
begin;

-- A) Estrutura minima de efetivo
alter table public.efetivo
add column if not exists pelotao text;

-- B) Padrao id fixo por militar
update public.efetivo
set id_efetivo = 'ef-' || id
where id is not null
  and id_efetivo is distinct from ('ef-' || id);

-- C) Remove duplicados por id (mantem o mais recente)
with ranked as (
  select
    ctid,
    id,
    row_number() over (
      partition by id
      order by updated_at desc nulls last, data_referencia desc nulls last, created_at desc nulls last
    ) as rn
  from public.efetivo
)
delete from public.efetivo e
using ranked r
where e.ctid = r.ctid
  and r.rn > 1;

-- D) Unicidade para evitar novas duplicidades
create unique index if not exists ux_efetivo_id on public.efetivo(id);
create unique index if not exists ux_efetivo_id_efetivo on public.efetivo(id_efetivo);

-- E) Backfill de pelotao no efetivo
update public.efetivo e
set pelotao = q.pelotao,
    updated_at = now()
from public.quadro_organizacional q
where q.id = e.id
  and e.pelotao is distinct from q.pelotao;

-- F) Seed diario (prepara efetivo do dia sem duplicar)
create or replace function public.seed_efetivo_dia(p_data date default current_date)
returns void
language plpgsql
security definer
as $$
begin
  insert into public.efetivo (
    id_efetivo, id, data_referencia, em_forma, situacao, pelotao, created_at, updated_at
  )
  select
    'ef-' || q.id as id_efetivo,
    q.id,
    p_data,
    false,
    ''::text,
    q.pelotao,
    now(),
    now()
  from public.quadro_organizacional q
  where q.id is not null
    and btrim(q.id) <> ''
  on conflict (id) do update
    set data_referencia = excluded.data_referencia,
        pelotao        = excluded.pelotao,
        updated_at     = now();
end;
$$;

-- G) Upsert unitario (app/sheets) sem gerar nova linha
create or replace function public.upsert_efetivo(
  p_id text,
  p_data date,
  p_situacao text,
  p_em_forma boolean
)
returns void
language plpgsql
security definer
as $$
declare
  v_pelotao text;
begin
  select q.pelotao into v_pelotao
  from public.quadro_organizacional q
  where q.id = p_id;

  insert into public.efetivo (
    id_efetivo, id, data_referencia, situacao, em_forma, pelotao, created_at, updated_at
  )
  values (
    'ef-' || p_id, p_id, p_data, p_situacao, p_em_forma, v_pelotao, now(), now()
  )
  on conflict (id) do update
    set data_referencia = excluded.data_referencia,
        situacao       = excluded.situacao,
        em_forma       = excluded.em_forma,
        pelotao        = excluded.pelotao,
        updated_at     = now();
end;
$$;

-- H) Trigger: quadro_organizacional -> tabelas dependentes por id
create or replace function public.trg_sync_quadro_dependentes()
returns trigger
language plpgsql
as $$
declare
  v_tabela text;
  v_col text;
  v_set text;
  v_sql text;
  v_tem_updated_at boolean;
  v_tabelas text[] := array[
    'efetivo',
    'taf',
    'tat',
    'fatos_observados',
    'historico_obs',
    'punicoes'
  ];
  v_cols text[] := array[
    'pg',
    'numero',
    'nome_guerra',
    'funcao',
    'fracao',
    'pelotao',
    'nome_completo'
  ];
begin
  insert into public.efetivo (id_efetivo, id, pelotao, data_referencia, em_forma, situacao, created_at, updated_at)
  values ('ef-' || new.id, new.id, new.pelotao, current_date, false, '', now(), now())
  on conflict (id_efetivo) do update
     set pelotao = excluded.pelotao,
         updated_at = now();

  foreach v_tabela in array v_tabelas loop
    if exists (
      select 1
      from information_schema.columns
      where table_schema='public' and table_name=v_tabela and column_name='id'
    ) then
      v_set := '';

      foreach v_col in array v_cols loop
        if exists (
          select 1
          from information_schema.columns
          where table_schema='public' and table_name=v_tabela and column_name=v_col
        ) then
          v_set := v_set
            || case when v_set = '' then '' else ', ' end
            || format('%1$I = ($1).%1$I', v_col);
        end if;
      end loop;

      select exists (
        select 1
        from information_schema.columns
        where table_schema='public' and table_name=v_tabela and column_name='updated_at'
      ) into v_tem_updated_at;

      if v_tem_updated_at then
        v_set := v_set || case when v_set = '' then '' else ', ' end || 'updated_at = now()';
      end if;

      if v_set <> '' then
        v_sql := format('update public.%I t set %s where t.id = ($1).id', v_tabela, v_set);
        execute v_sql using new;
      end if;
    end if;
  end loop;

  return new;
end;
$$;

drop trigger if exists tg_sync_quadro_dependentes on public.quadro_organizacional;
create trigger tg_sync_quadro_dependentes
after insert or update of pg, numero, nome_guerra, funcao, fracao, pelotao, nome_completo
on public.quadro_organizacional
for each row
execute function public.trg_sync_quadro_dependentes();

-- I) View "hoje" (somente efetivo)
drop view if exists public.v_efetivo_hoje;
create view public.v_efetivo_hoje as
select
  e.id_efetivo,
  e.id,
  e.pelotao,
  e.data_referencia,
  e.em_forma,
  e.situacao,
  e.created_at,
  e.updated_at
from public.efetivo e
where e.data_referencia = current_date
order by e.pelotao, e.id;

grant select on public.v_efetivo_hoje to anon, authenticated;
grant execute on function public.seed_efetivo_dia(date) to anon, authenticated;
grant execute on function public.upsert_efetivo(text, date, text, boolean) to anon, authenticated;

commit;
```

## 2) Apps Script consolidado (Google Sheets)

Cole no `Code.gs` em `Extensoes > Apps Script`.

```javascript
/*********** CONFIG ***********/
const SUPABASE_URL = 'https://qythmpzrtotvmakomydm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_NpvAv2JSF9OMoggyjynqkw_RoktkWIp';

const ABA_BASE = 'EFETIVO_BASE';
const ABA_MAPA = 'MAPA_FORCA';
const TIMEZONE = 'America/Sao_Paulo';

/*********** MENU ***********/
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Mapa da Forca')
    .addItem('Atualizar mapa (dia)', 'botaoAtualizarMapa')
    .addItem('Gerar mapa da forca (PDF)', 'botaoGerarMapaDaForca')
    .addSeparator()
    .addItem('Somente montar layout', 'montarMapaDaForca')
    .addToUi();
}

function botaoAtualizarMapa() {
  sincronizarEfetivoHoje();
  montarMapaDaForca();
}

function botaoGerarMapaDaForca() {
  botaoAtualizarMapa();
  gerarMapaDaForcaPDF();
}

/*********** HTTP ***********/
function supabaseRequest(path, method, body) {
  const options = {
    method: method,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    muteHttpExceptions: true
  };

  if (body) options.payload = JSON.stringify(body);

  const resp = UrlFetchApp.fetch(SUPABASE_URL + path, options);
  const code = resp.getResponseCode();
  const txt = resp.getContentText();

  if (code < 200 || code >= 300) {
    throw new Error('Supabase erro ' + code + ': ' + txt);
  }

  return txt ? JSON.parse(txt) : null;
}

/*********** SINCRONIZACAO ***********/
function sincronizarEfetivoHoje() {
  supabaseRequest('/rest/v1/rpc/seed_efetivo_dia', 'post', { p_data: hojeISO() });

  // Versao atual da view (somente campos de efetivo)
  const rows = supabaseRequest(
    '/rest/v1/v_efetivo_hoje?select=id,id_efetivo,pelotao,situacao,em_forma,data_referencia&order=pelotao.asc,id.asc',
    'get'
  );

  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName(ABA_BASE) || ss.insertSheet(ABA_BASE);
  sh.clearContents();

  const headers = ['id', 'id_efetivo', 'pelotao', 'situacao', 'em_forma', 'data_referencia'];
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);

  if (rows && rows.length) {
    const values = rows.map(r => [
      r.id, r.id_efetivo, r.pelotao, r.situacao, r.em_forma, r.data_referencia
    ]);
    sh.getRange(2, 1, values.length, headers.length).setValues(values);
  }
}

/*********** PDF ***********/
function gerarMapaDaForcaPDF() {
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName(ABA_MAPA);
  if (!sh) throw new Error('Aba "' + ABA_MAPA + '" nao encontrada.');

  const nomeArquivo = 'Mapa_da_Forca_' + Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd') + '.pdf';
  const exportUrl =
    'https://docs.google.com/spreadsheets/d/' + ss.getId() + '/export?' +
    [
      'format=pdf',
      'portrait=false',
      'size=A4',
      'fitw=true',
      'sheetnames=false',
      'printtitle=false',
      'pagenumbers=false',
      'gridlines=false',
      'fzr=false',
      'gid=' + sh.getSheetId()
    ].join('&');

  const token = ScriptApp.getOAuthToken();
  const blob = UrlFetchApp.fetch(exportUrl, {
    headers: { Authorization: 'Bearer ' + token }
  }).getBlob().setName(nomeArquivo);

  const file = DriveApp.createFile(blob);
  SpreadsheetApp.getUi().alert('PDF gerado:\n' + file.getUrl());
}

/*********** LAYOUT BASICO MAPA ***********/
function montarMapaDaForca() {
  const ss = SpreadsheetApp.getActive();
  const base = ss.getSheetByName(ABA_BASE);
  if (!base) throw new Error('Aba "' + ABA_BASE + '" nao encontrada.');

  const mapa = ss.getSheetByName(ABA_MAPA) || ss.insertSheet(ABA_MAPA);
  mapa.clear();
  mapa.setHiddenGridlines(true);

  const data = base.getDataRange().getValues();
  if (data.length < 2) throw new Error('Aba EFETIVO_BASE vazia.');

  const headers = data[0].map(h => String(h).trim().toLowerCase());
  const idxPel = headers.indexOf('pelotao');
  const idxSit = headers.indexOf('situacao');
  if (idxPel < 0 || idxSit < 0) throw new Error('Colunas pelotao/situacao nao encontradas.');

  const rows = data.slice(1).filter(r => String(r[0] || '').trim() !== '');
  const total = rows.length;
  const baixados = rows.filter(r => String(r[idxSit] || '').toLowerCase().includes('baix')).length;
  const destinos = rows.filter(r => {
    const s = String(r[idxSit] || '').toLowerCase();
    return s && !s.includes('em_forma') && !s.includes('em forma') && !s.includes('falta') && !s.includes('baix');
  }).length;

  mapa.getRange('A1:H2').merge()
    .setValue('Mapa da Forca - 1a Cia Fuz')
    .setBackground('#0f172a')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(18)
    .setHorizontalAlignment('left');

  mapa.getRange('A3:C4').merge().setValue('Total Cia\n' + total).setBackground('#0ea5e9').setFontColor('#fff').setFontWeight('bold').setHorizontalAlignment('center');
  mapa.getRange('D3:F4').merge().setValue('Destinos\n' + destinos).setBackground('#f59e0b').setFontColor('#fff').setFontWeight('bold').setHorizontalAlignment('center');
  mapa.getRange('G3:H4').merge().setValue('Baixados\n' + baixados).setBackground('#ef4444').setFontColor('#fff').setFontWeight('bold').setHorizontalAlignment('center');
}

function hojeISO() {
  return Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd');
}
```

## 3) Fluxo operacional

1. Atualizar `quadro_organizacional` (base principal).
2. Trigger do banco propaga campos em comum para `efetivo` e outras tabelas.
3. `seed_efetivo_dia` garante o efetivo do dia sem duplicar registros.
4. Google Sheets chama `sincronizarEfetivoHoje` e alimenta `EFETIVO_BASE`.
5. `montarMapaDaForca` e `gerarMapaDaForcaPDF` produzem o mapa.

## 4) Erros comuns

- `duplicate key ... ux_efetivo_id`:
  - existem IDs duplicados em `efetivo`.
  - execute a parte de deduplicacao (secao 1C) e recrie indices.

- `column e.pg does not exist`:
  - `efetivo` nao possui coluna `pg`.
  - nao usar SQL com referencia direta a colunas ausentes; use o trigger dinamico deste guia.

- erro 409 no Apps Script:
  - ocorre quando o app faz `insert` sem `upsert`.
  - use RPC `upsert_efetivo` ou `seed_efetivo_dia`.
