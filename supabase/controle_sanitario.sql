-- Caveirinha App - Estrutura base de public.controle_sanitario
-- Fonte: introspeccao do projeto remoto no Supabase

begin;

create table if not exists public.controle_sanitario (
  id_controle_sanitario uuid primary key default gen_random_uuid(),
  id text not null,
  sheet_row_id text not null,
  origem_planilha text not null default 'google_sheets',
  data_referencia date,
  data_visita date not null,
  tipo_atendimento text,
  local_atendimento text,
  profissional_saude text,
  cid text,
  diagnostico text,
  situacao text,
  parecer text,
  restricao text,
  dispensado boolean not null default false,
  baixado boolean not null default false,
  internado boolean not null default false,
  dias_afastamento integer,
  data_inicio_afastamento date,
  data_fim_afastamento date,
  observacao text,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  motivo text,
  prescricao text,
  atendido_por text,
  su text,
  pelotao text
);

alter table public.controle_sanitario add column if not exists id_controle_sanitario uuid default gen_random_uuid();
alter table public.controle_sanitario add column if not exists id text;
alter table public.controle_sanitario add column if not exists sheet_row_id text;
alter table public.controle_sanitario add column if not exists origem_planilha text not null default 'google_sheets';
alter table public.controle_sanitario add column if not exists data_referencia date;
alter table public.controle_sanitario add column if not exists data_visita date;
alter table public.controle_sanitario add column if not exists tipo_atendimento text;
alter table public.controle_sanitario add column if not exists local_atendimento text;
alter table public.controle_sanitario add column if not exists profissional_saude text;
alter table public.controle_sanitario add column if not exists cid text;
alter table public.controle_sanitario add column if not exists diagnostico text;
alter table public.controle_sanitario add column if not exists situacao text;
alter table public.controle_sanitario add column if not exists parecer text;
alter table public.controle_sanitario add column if not exists restricao text;
alter table public.controle_sanitario add column if not exists dispensado boolean not null default false;
alter table public.controle_sanitario add column if not exists baixado boolean not null default false;
alter table public.controle_sanitario add column if not exists internado boolean not null default false;
alter table public.controle_sanitario add column if not exists dias_afastamento integer;
alter table public.controle_sanitario add column if not exists data_inicio_afastamento date;
alter table public.controle_sanitario add column if not exists data_fim_afastamento date;
alter table public.controle_sanitario add column if not exists observacao text;
alter table public.controle_sanitario add column if not exists raw_payload jsonb not null default '{}'::jsonb;
alter table public.controle_sanitario add column if not exists created_at timestamptz not null default now();
alter table public.controle_sanitario add column if not exists updated_at timestamptz not null default now();
alter table public.controle_sanitario add column if not exists motivo text;
alter table public.controle_sanitario add column if not exists prescricao text;
alter table public.controle_sanitario add column if not exists atendido_por text;
alter table public.controle_sanitario add column if not exists su text;
alter table public.controle_sanitario add column if not exists pelotao text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.controle_sanitario'::regclass
      and contype = 'p'
  ) then
    execute 'alter table public.controle_sanitario add primary key (id_controle_sanitario)';
  end if;
end $$;

create index if not exists idx_controle_sanitario_id on public.controle_sanitario (id);
create index if not exists idx_controle_sanitario_data_visita on public.controle_sanitario (data_visita desc nulls last);
create index if not exists idx_controle_sanitario_pelotao on public.controle_sanitario (pelotao);
create index if not exists idx_controle_sanitario_situacao on public.controle_sanitario (situacao);
create index if not exists idx_controle_sanitario_id_data_visita_created_at
  on public.controle_sanitario (id, data_visita desc nulls last, created_at desc);
create index if not exists idx_controle_sanitario_pelotao_data_visita
  on public.controle_sanitario (pelotao, data_visita desc nulls last);
create unique index if not exists uq_controle_sanitario_sheet_row on public.controle_sanitario (sheet_row_id);

alter table public.controle_sanitario drop constraint if exists controle_sanitario_id_fkey;
alter table public.controle_sanitario drop constraint if exists fk_controle_sanitario_militar;
alter table public.controle_sanitario
  add constraint fk_controle_sanitario_militar
  foreign key (id)
  references public.quadro_organizacional (id)
  on update cascade
  on delete cascade;

create or replace function public.set_updated_at_controle_sanitario()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_controle_sanitario on public.controle_sanitario;
create trigger trg_set_updated_at_controle_sanitario
before update on public.controle_sanitario
for each row
execute function public.set_updated_at_controle_sanitario();

create or replace function public.upsert_controle_sanitario_google(
  p_sheet_row_id text,
  p_id text,
  p_data_referencia date default null,
  p_data_visita date default null,
  p_tipo_atendimento text default null,
  p_local_atendimento text default null,
  p_profissional_saude text default null,
  p_cid text default null,
  p_diagnostico text default null,
  p_situacao text default null,
  p_parecer text default null,
  p_restricao text default null,
  p_dispensado boolean default false,
  p_baixado boolean default false,
  p_internado boolean default false,
  p_dias_afastamento integer default null,
  p_data_inicio_afastamento date default null,
  p_data_fim_afastamento date default null,
  p_observacao text default null,
  p_raw_payload jsonb default '{}'::jsonb
)
returns public.controle_sanitario
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.controle_sanitario;
begin
  if not exists (
    select 1
    from public.quadro_organizacional q
    where q.id = p_id
  ) then
    raise exception 'Militar com id % nao existe em quadro_organizacional', p_id;
  end if;

  insert into public.controle_sanitario (
    sheet_row_id,
    id,
    data_referencia,
    data_visita,
    tipo_atendimento,
    local_atendimento,
    profissional_saude,
    cid,
    diagnostico,
    situacao,
    parecer,
    restricao,
    dispensado,
    baixado,
    internado,
    dias_afastamento,
    data_inicio_afastamento,
    data_fim_afastamento,
    observacao,
    raw_payload
  )
  values (
    p_sheet_row_id,
    p_id,
    p_data_referencia,
    p_data_visita,
    p_tipo_atendimento,
    p_local_atendimento,
    p_profissional_saude,
    p_cid,
    p_diagnostico,
    p_situacao,
    p_parecer,
    p_restricao,
    coalesce(p_dispensado, false),
    coalesce(p_baixado, false),
    coalesce(p_internado, false),
    p_dias_afastamento,
    p_data_inicio_afastamento,
    p_data_fim_afastamento,
    p_observacao,
    coalesce(p_raw_payload, '{}'::jsonb)
  )
  on conflict (sheet_row_id) do update
    set id                      = excluded.id,
        data_referencia         = excluded.data_referencia,
        data_visita             = excluded.data_visita,
        tipo_atendimento        = excluded.tipo_atendimento,
        local_atendimento       = excluded.local_atendimento,
        profissional_saude      = excluded.profissional_saude,
        cid                     = excluded.cid,
        diagnostico             = excluded.diagnostico,
        situacao                = excluded.situacao,
        parecer                 = excluded.parecer,
        restricao               = excluded.restricao,
        dispensado              = excluded.dispensado,
        baixado                 = excluded.baixado,
        internado               = excluded.internado,
        dias_afastamento        = excluded.dias_afastamento,
        data_inicio_afastamento = excluded.data_inicio_afastamento,
        data_fim_afastamento    = excluded.data_fim_afastamento,
        observacao              = excluded.observacao,
        raw_payload             = excluded.raw_payload,
        updated_at              = now()
  returning * into v_row;

  return v_row;
end;
$$;

alter table public.controle_sanitario enable row level security;

drop policy if exists controle_sanitario_select on public.controle_sanitario;
drop policy if exists controle_sanitario_insert on public.controle_sanitario;
drop policy if exists controle_sanitario_update on public.controle_sanitario;
drop policy if exists controle_sanitario_delete on public.controle_sanitario;

create policy controle_sanitario_select on public.controle_sanitario
for select to authenticated
using (public.caveirinha_can_access_militar(public.controle_sanitario.id));

create policy controle_sanitario_insert on public.controle_sanitario
for insert to authenticated
with check (public.caveirinha_can_access_militar(public.controle_sanitario.id));

create policy controle_sanitario_update on public.controle_sanitario
for update to authenticated
using (public.caveirinha_can_access_militar(public.controle_sanitario.id))
with check (public.caveirinha_can_access_militar(public.controle_sanitario.id));

create policy controle_sanitario_delete on public.controle_sanitario
for delete to authenticated
using (public.caveirinha_can_access_militar(public.controle_sanitario.id));

grant execute on function public.upsert_controle_sanitario_google(
  text, text, date, date, text, text, text, text, text, text, text, text,
  boolean, boolean, boolean, integer, date, date, text, jsonb
) to authenticated, service_role;

commit;
