-- Caveirinha App - Migracao TAT para schema id_tat (PK) + id (FK quadro_organizacional.id)
-- Script idempotente (pode rodar mais de uma vez)

begin;

create table if not exists public.tat (
  id_tat text primary key,
  id text not null,
  data date not null,
  armamento text not null default '',
  pontuacao text not null default '',
  mencao text not null check (mencao in ('I', 'R', 'B', 'MB', 'E')),
  classificacao text not null check (classificacao in ('I', 'R', 'B', 'MB', 'E')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'tat' and column_name = 'tatid'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'tat' and column_name = 'id_tat'
  ) then
    execute 'alter table public.tat rename column tatid to id_tat';
  end if;
end $$;

alter table public.tat add column if not exists id_tat text;
alter table public.tat add column if not exists id text;
alter table public.tat add column if not exists data date;
alter table public.tat add column if not exists armamento text not null default '';
alter table public.tat add column if not exists pontuacao text not null default '';
alter table public.tat add column if not exists mencao text not null default 'B';
alter table public.tat add column if not exists classificacao text not null default 'B';
alter table public.tat add column if not exists created_at timestamptz not null default now();
alter table public.tat add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_tat_id on public.tat (id);
create index if not exists idx_tat_data on public.tat (data desc);
create index if not exists idx_tat_id_data_created_at on public.tat (id, data desc, created_at desc);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.tat'::regclass
      and contype = 'p'
  ) then
    execute 'alter table public.tat add primary key (id_tat)';
  end if;
end $$;

alter table public.tat drop constraint if exists tat_id_fkey;
alter table public.tat
  add constraint tat_id_fkey
  foreign key (id)
  references public.quadro_organizacional (id)
  on update cascade
  on delete cascade;

alter table public.tat drop constraint if exists tat_mencao_check;
alter table public.tat add constraint tat_mencao_check check (mencao in ('I', 'R', 'B', 'MB', 'E'));
alter table public.tat drop constraint if exists tat_classificacao_check;
alter table public.tat add constraint tat_classificacao_check check (classificacao in ('I', 'R', 'B', 'MB', 'E'));

create or replace function public.set_updated_at_tat()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_tat on public.tat;
create trigger trg_set_updated_at_tat
before update on public.tat
for each row
execute function public.set_updated_at_tat();

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

alter table public.tat enable row level security;

drop policy if exists tat_select on public.tat;
drop policy if exists tat_insert on public.tat;
drop policy if exists tat_update on public.tat;
drop policy if exists tat_delete on public.tat;

create policy tat_select
on public.tat
for select
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = tat.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy tat_insert
on public.tat
for insert
to authenticated
with check (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = tat.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy tat_update
on public.tat
for update
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = tat.id
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
    join public.quadro_organizacional q on q.id = tat.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy tat_delete
on public.tat
for delete
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = tat.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

insert into public.tat (
  id_tat,
  id,
  data,
  armamento,
  pontuacao,
  mencao,
  classificacao,
  updated_at
)
values
  ('tat-001', 'mil-002', '2026-02-05', 'FZ 556', '92', 'MB', 'MB', '2026-03-01T09:00:00.000Z'),
  ('tat-002', 'mil-004', '2026-02-05', 'FZ 556', '84', 'B', 'B', '2026-03-01T09:00:00.000Z'),
  ('tat-003', 'mil-007', '2026-02-06', 'FZ 556', '88', 'B', 'B', '2026-03-01T09:00:00.000Z'),
  ('tat-004', 'mil-009', '2026-02-06', 'FZ 556', '90', 'MB', 'MB', '2026-03-01T09:00:00.000Z'),
  ('tat-005', 'mil-011', '2026-02-07', 'Pistola 9mm', '86', 'B', 'B', '2026-03-01T09:00:00.000Z'),
  ('tat-006', 'mil-012', '2026-02-07', 'FZ 556', '95', 'MB', 'MB', '2026-03-01T09:00:00.000Z')
on conflict (id_tat) do update set
  id = excluded.id,
  data = excluded.data,
  armamento = excluded.armamento,
  pontuacao = excluded.pontuacao,
  mencao = excluded.mencao,
  classificacao = excluded.classificacao,
  updated_at = excluded.updated_at;

commit;

