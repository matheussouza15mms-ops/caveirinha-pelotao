-- Caveirinha App - Migracao Efetivo para schema id_efetivo (PK) + id (FK quadro_organizacional.id)
-- Script idempotente (pode rodar mais de uma vez)

begin;

create table if not exists public.efetivo (
  id_efetivo text primary key,
  id text not null,
  data_referencia date not null,
  em_forma boolean not null default false,
  situacao text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint efetivo_situacao_check
    check (situacao in ('', 'em_forma', 'ferias', 'dispensado', 'missao', 'servico', 's_sv', 'atrasado', 'outros', 'falta', 'baixado'))
);

alter table public.efetivo add column if not exists id_efetivo text;
alter table public.efetivo add column if not exists id text;
alter table public.efetivo add column if not exists data_referencia date;
alter table public.efetivo add column if not exists em_forma boolean not null default false;
alter table public.efetivo add column if not exists situacao text not null default '';
alter table public.efetivo add column if not exists created_at timestamptz not null default now();
alter table public.efetivo add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_efetivo_id on public.efetivo (id);
create index if not exists idx_efetivo_data_referencia on public.efetivo (data_referencia desc);
create unique index if not exists uq_efetivo_id_data on public.efetivo (id, data_referencia);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.efetivo'::regclass
      and contype = 'p'
  ) then
    execute 'alter table public.efetivo add primary key (id_efetivo)';
  end if;
end $$;

alter table public.efetivo drop constraint if exists efetivo_id_fkey;
alter table public.efetivo
  add constraint efetivo_id_fkey
  foreign key (id)
  references public.quadro_organizacional (id)
  on update cascade
  on delete cascade;

alter table public.efetivo drop constraint if exists efetivo_situacao_check;
alter table public.efetivo
  add constraint efetivo_situacao_check
  check (situacao in ('', 'em_forma', 'ferias', 'dispensado', 'missao', 'servico', 's_sv', 'atrasado', 'outros', 'falta', 'baixado'));

create or replace function public.set_updated_at_efetivo()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_efetivo on public.efetivo;
create trigger trg_set_updated_at_efetivo
before update on public.efetivo
for each row
execute function public.set_updated_at_efetivo();

create or replace function public.caveirinha_normalize_pelotao(input_text text)
returns text
language sql
immutable
as $$
  with src as (
    select lower(regexp_replace(coalesce(input_text, ''), '\s+', ' ', 'g')) as v
  )
  select case
    when v like '1%pel%' then '1 pel'
    when v like '2%pel%' then '2 pel'
    when v like '3%pel%' then '3 pel'
    when v like '%pel%ap%' then 'pel ap'
    when v like '%sec%cmdo%' then 'sec cmdo'
    else trim(v)
  end
  from src;
$$;

alter table public.efetivo enable row level security;

drop policy if exists efetivo_select on public.efetivo;
drop policy if exists efetivo_insert on public.efetivo;
drop policy if exists efetivo_update on public.efetivo;
drop policy if exists efetivo_delete on public.efetivo;

create policy efetivo_select
on public.efetivo
for select
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = efetivo.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy efetivo_insert
on public.efetivo
for insert
to authenticated
with check (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = efetivo.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy efetivo_update
on public.efetivo
for update
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = efetivo.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
)
with check (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = efetivo.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy efetivo_delete
on public.efetivo
for delete
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = efetivo.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

insert into public.efetivo (
  id_efetivo,
  id,
  data_referencia,
  em_forma,
  situacao
)
values
  ('ef-mil-001-2026-02-28', 'mil-001', '2026-02-28', true,  'em_forma'),
  ('ef-mil-002-2026-02-28', 'mil-002', '2026-02-28', true,  'em_forma'),
  ('ef-mil-003-2026-02-28', 'mil-003', '2026-02-28', false, 'missao'),
  ('ef-mil-004-2026-02-28', 'mil-004', '2026-02-28', false, 'falta'),
  ('ef-mil-005-2026-02-28', 'mil-005', '2026-02-28', true,  'em_forma'),
  ('ef-mil-006-2026-02-28', 'mil-006', '2026-02-28', false, 'baixado'),
  ('ef-mil-007-2026-02-28', 'mil-007', '2026-02-28', true,  'em_forma'),
  ('ef-mil-008-2026-02-28', 'mil-008', '2026-02-28', false, 'ferias'),
  ('ef-mil-009-2026-02-28', 'mil-009', '2026-02-28', true,  'em_forma'),
  ('ef-mil-010-2026-02-28', 'mil-010', '2026-02-28', false, 'outros'),
  ('ef-mil-011-2026-02-28', 'mil-011', '2026-02-28', true,  'em_forma'),
  ('ef-mil-012-2026-02-28', 'mil-012', '2026-02-28', true,  'em_forma'),
  ('ef-mil-013-2026-02-28', 'mil-013', '2026-02-28', false, 'missao'),
  ('ef-mil-014-2026-02-28', 'mil-014', '2026-02-28', true,  'em_forma'),
  ('ef-mil-015-2026-02-28', 'mil-015', '2026-02-28', false, 'falta')
on conflict (id_efetivo) do update set
  id = excluded.id,
  data_referencia = excluded.data_referencia,
  em_forma = excluded.em_forma,
  situacao = excluded.situacao;

commit;

