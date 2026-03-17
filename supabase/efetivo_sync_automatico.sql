begin;

alter table public.efetivo
  add column if not exists pelotao text;

update public.efetivo
set id_efetivo = 'ef-' || id
where coalesce(btrim(id), '') <> ''
  and id_efetivo is distinct from ('ef-' || id);

with efetivo_ranked as (
  select
    ctid,
    id,
    row_number() over (
      partition by id
      order by data_referencia desc nulls last, updated_at desc nulls last, created_at desc nulls last
    ) as rn
  from public.efetivo
  where coalesce(btrim(id), '') <> ''
)
delete from public.efetivo e
using efetivo_ranked r
where e.ctid = r.ctid
  and r.rn > 1;

create unique index if not exists uq_efetivo_id
  on public.efetivo (id);

create index if not exists idx_efetivo_data_referencia
  on public.efetivo (data_referencia desc);

create index if not exists idx_efetivo_pelotao
  on public.efetivo (pelotao);

update public.efetivo e
set pelotao = q.pelotao,
    updated_at = now()
from public.quadro_organizacional q
where q.id = e.id
  and e.pelotao is distinct from q.pelotao;

create or replace function public.caveirinha_data_hoje_br()
returns date
language sql
stable
as $$
  select (timezone('America/Sao_Paulo', now()))::date;
$$;

create or replace function public.seed_efetivo_dia(
  p_data date default null
)
returns void
language plpgsql
security definer
as $$
declare
  v_data date;
begin
  v_data := coalesce(p_data, public.caveirinha_data_hoje_br());

  insert into public.efetivo (
    id_efetivo,
    id,
    data_referencia,
    em_forma,
    situacao,
    pelotao,
    created_at,
    updated_at
  )
  select
    'ef-' || q.id,
    q.id,
    v_data,
    false,
    ''::text,
    q.pelotao,
    now(),
    now()
  from public.quadro_organizacional q
  where coalesce(btrim(q.id), '') <> ''
  on conflict (id) do update
    set data_referencia = excluded.data_referencia,
        pelotao = excluded.pelotao,
        updated_at = now();
end;
$$;

drop function if exists public.upsert_efetivo(text, date, text, boolean);

create or replace function public.upsert_efetivo(
  p_id text,
  p_data date default null,
  p_situacao text default '',
  p_em_forma boolean default false
)
returns void
language plpgsql
security definer
as $$
declare
  v_pelotao text;
  v_situacao text;
  v_data date;
begin
  v_data := coalesce(p_data, public.caveirinha_data_hoje_br());

  select q.pelotao
    into v_pelotao
  from public.quadro_organizacional q
  where q.id = p_id;

  if v_pelotao is null then
    raise exception 'Militar % nao encontrado em quadro_organizacional', p_id;
  end if;

  v_situacao := lower(trim(coalesce(p_situacao, '')));
  if p_em_forma then
    v_situacao := 'em_forma';
  end if;

  insert into public.efetivo (
    id_efetivo,
    id,
    data_referencia,
    situacao,
    em_forma,
    pelotao,
    created_at,
    updated_at
  )
  values (
    'ef-' || p_id,
    p_id,
    v_data,
    v_situacao,
    p_em_forma,
    v_pelotao,
    now(),
    now()
  )
  on conflict (id) do update
    set data_referencia = excluded.data_referencia,
        situacao = excluded.situacao,
        em_forma = excluded.em_forma,
        pelotao = excluded.pelotao,
        updated_at = now();
end;
$$;

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
  perform public.seed_efetivo_dia(public.caveirinha_data_hoje_br());

  insert into public.efetivo (
    id_efetivo,
    id,
    data_referencia,
    em_forma,
    situacao,
    pelotao,
    created_at,
    updated_at
  )
  values (
    'ef-' || new.id,
    new.id,
    public.caveirinha_data_hoje_br(),
    false,
    ''::text,
    new.pelotao,
    now(),
    now()
  )
  on conflict (id) do update
    set data_referencia = excluded.data_referencia,
        pelotao = excluded.pelotao,
        updated_at = now();

  foreach v_tabela in array v_tabelas loop
    if exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = v_tabela
        and column_name = 'id'
    ) then
      v_set := '';

      foreach v_col in array v_cols loop
        if exists (
          select 1
          from information_schema.columns
          where table_schema = 'public'
            and table_name = v_tabela
            and column_name = v_col
        ) then
          v_set := v_set
            || case when v_set = '' then '' else ', ' end
            || format('%1$I = ($1).%1$I', v_col);
        end if;
      end loop;

      select exists (
        select 1
        from information_schema.columns
        where table_schema = 'public'
          and table_name = v_tabela
          and column_name = 'updated_at'
      )
      into v_tem_updated_at;

      if v_tem_updated_at then
        v_set := v_set || case when v_set = '' then '' else ', ' end || 'updated_at = now()';
      end if;

      if v_set <> '' then
        v_sql := format('update public.%I set %s where id = ($1).id', v_tabela, v_set);
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

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'efetivo'
  ) then
    alter publication supabase_realtime add table public.efetivo;
  end if;

  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'quadro_organizacional'
  ) then
    alter publication supabase_realtime add table public.quadro_organizacional;
  end if;
end;
$$;

grant execute on function public.seed_efetivo_dia(date) to anon, authenticated;
grant execute on function public.upsert_efetivo(text, date, text, boolean) to anon, authenticated;
grant execute on function public.caveirinha_data_hoje_br() to anon, authenticated;

commit;
