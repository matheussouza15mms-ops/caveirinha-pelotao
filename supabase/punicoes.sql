-- Caveirinha App - Migracao Punicoes para schema id_punicao (PK) + id (FK quadro_organizacional.id)
-- Script idempotente (pode rodar mais de uma vez)

begin;

create table if not exists public.punicoes (
  id_punicao text primary key,
  id text not null,
  fato text not null,
  punicao text not null check (punicao in ('ADV', 'IMP', 'DET', 'REP', 'PRISAO')),
  dias integer not null default 0,
  data_inicio date not null,
  data_fim date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  -- Migra schema legado CSV: punicaoId,id,fato,punicao,dias,dataInicio,dataFim,lastUpdate
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'punicoes' and column_name = 'punicaoid'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'punicoes' and column_name = 'id_punicao'
  ) then
    execute 'alter table public.punicoes rename column punicaoid to id_punicao';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'punicoes' and column_name = 'datainicio'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'punicoes' and column_name = 'data_inicio'
  ) then
    execute 'alter table public.punicoes rename column datainicio to data_inicio';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'punicoes' and column_name = 'datafim'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'punicoes' and column_name = 'data_fim'
  ) then
    execute 'alter table public.punicoes rename column datafim to data_fim';
  end if;
end $$;

alter table public.punicoes add column if not exists id_punicao text;
alter table public.punicoes add column if not exists id text;
alter table public.punicoes add column if not exists fato text;
alter table public.punicoes add column if not exists punicao text;
alter table public.punicoes add column if not exists dias integer not null default 0;
alter table public.punicoes add column if not exists data_inicio date;
alter table public.punicoes add column if not exists data_fim date;
alter table public.punicoes add column if not exists created_at timestamptz not null default now();
alter table public.punicoes add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_punicoes_id on public.punicoes (id);
create index if not exists idx_punicoes_data_inicio on public.punicoes (data_inicio desc);
create index if not exists idx_punicoes_id_data_inicio_created_at
  on public.punicoes (id, data_inicio desc, created_at desc);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.punicoes'::regclass
      and contype = 'p'
  ) then
    execute 'alter table public.punicoes add primary key (id_punicao)';
  end if;
end $$;

alter table public.punicoes drop constraint if exists punicoes_id_fkey;
alter table public.punicoes
  add constraint punicoes_id_fkey
  foreign key (id)
  references public.quadro_organizacional (id)
  on update cascade
  on delete cascade;

alter table public.punicoes drop constraint if exists punicoes_punicao_check;
alter table public.punicoes
  add constraint punicoes_punicao_check
  check (punicao in ('ADV', 'IMP', 'DET', 'REP', 'PRISAO'));

create or replace function public.set_updated_at_punicoes()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_punicoes on public.punicoes;
create trigger trg_set_updated_at_punicoes
before update on public.punicoes
for each row
execute function public.set_updated_at_punicoes();

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

alter table public.punicoes enable row level security;

drop policy if exists punicoes_select on public.punicoes;
drop policy if exists punicoes_insert on public.punicoes;
drop policy if exists punicoes_update on public.punicoes;
drop policy if exists punicoes_delete on public.punicoes;

create policy punicoes_select
on public.punicoes
for select
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = punicoes.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy punicoes_insert
on public.punicoes
for insert
to authenticated
with check (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = punicoes.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy punicoes_update
on public.punicoes
for update
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = punicoes.id
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
    join public.quadro_organizacional q on q.id = punicoes.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy punicoes_delete
on public.punicoes
for delete
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = punicoes.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

insert into public.punicoes (
  id_punicao,
  id,
  fato,
  punicao,
  dias,
  data_inicio,
  data_fim,
  updated_at
)
values
  ('pun-001', 'mil-004', 'Atraso na formatura matinal', 'ADV', 0, '2026-02-03', '2026-02-03', '2026-03-01T09:10:00.000Z'),
  ('pun-002', 'mil-006', 'Uniforme em desacordo com o padrao', 'IMP', 1, '2026-02-06', '2026-02-07', '2026-03-01T09:12:00.000Z'),
  ('pun-003', 'mil-009', 'Falta injustificada ao servico', 'DET', 2, '2026-02-10', '2026-02-12', '2026-03-01T09:15:00.000Z'),
  ('pun-004', 'mil-010', 'Desrespeito a ordem de superior', 'REP', 3, '2026-02-11', '2026-02-14', '2026-03-01T09:18:00.000Z'),
  ('pun-005', 'mil-011', 'Ausencia sem autorizacao em escala', 'PRISAO', 5, '2026-02-15', '2026-02-20', '2026-03-01T09:22:00.000Z'),
  ('pun-006', 'mil-013', 'Falha em posto de sentinela', 'DET', 1, '2026-02-18', '2026-02-19', '2026-03-01T09:25:00.000Z'),
  ('pun-007', 'mil-014', 'Conduta inadequada em atividade externa', 'REP', 2, '2026-02-21', '2026-02-23', '2026-03-01T09:28:00.000Z'),
  ('pun-008', 'mil-008', 'Uso indevido de equipamento do pelotao', 'IMP', 0, '2026-02-24', '2026-02-24', '2026-03-01T09:30:00.000Z')
on conflict (id_punicao) do update set
  id = excluded.id,
  fato = excluded.fato,
  punicao = excluded.punicao,
  dias = excluded.dias,
  data_inicio = excluded.data_inicio,
  data_fim = excluded.data_fim,
  updated_at = excluded.updated_at;

commit;

