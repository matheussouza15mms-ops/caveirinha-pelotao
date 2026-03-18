-- Caveirinha App - Migracao FO para schema id_fo (PK) + id (FK quadro_organizacional.id)
-- Script idempotente (pode rodar mais de uma vez)

begin;

create table if not exists public.fatos_observados (
  id_fo text primary key,
  id text not null,
  data date not null,
  tipo text not null check (tipo in ('FO+', 'FO-')),
  descricao text not null,
  autor text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  -- Migra schema legado: id (fo) + id_militar -> id_fo + id
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'fatos_observados'
      and column_name = 'id_militar'
  ) and exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'fatos_observados'
      and column_name = 'id'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'fatos_observados'
      and column_name = 'id_fo'
  ) then
    execute 'alter table public.fatos_observados rename column id to id_fo';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'fatos_observados'
      and column_name = 'id_militar'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'fatos_observados'
      and column_name = 'id'
  ) then
    execute 'alter table public.fatos_observados rename column id_militar to id';
  end if;
end $$;

alter table public.fatos_observados add column if not exists id_fo text;
alter table public.fatos_observados add column if not exists id text;
alter table public.fatos_observados add column if not exists data date;
alter table public.fatos_observados add column if not exists tipo text;
alter table public.fatos_observados add column if not exists descricao text;
alter table public.fatos_observados add column if not exists autor text;
alter table public.fatos_observados add column if not exists created_at timestamptz not null default now();
alter table public.fatos_observados add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_fatos_observados_id on public.fatos_observados (id);
create index if not exists idx_fatos_observados_data on public.fatos_observados (data desc);
create index if not exists idx_fatos_observados_id_tipo_data_created_at
  on public.fatos_observados (id, tipo, data desc, created_at desc);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.fatos_observados'::regclass
      and contype = 'p'
  ) then
    execute 'alter table public.fatos_observados add primary key (id_fo)';
  end if;
end $$;

alter table public.fatos_observados drop constraint if exists fatos_observados_id_militar_fkey;
alter table public.fatos_observados drop constraint if exists fatos_observados_id_fkey;
alter table public.fatos_observados
  add constraint fatos_observados_id_fkey
  foreign key (id)
  references public.quadro_organizacional (id)
  on update cascade
  on delete cascade;

alter table public.fatos_observados drop constraint if exists fatos_observados_tipo_check;
alter table public.fatos_observados
  add constraint fatos_observados_tipo_check
  check (tipo in ('FO+', 'FO-'));

create or replace function public.set_updated_at_fatos_observados()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_fatos_observados on public.fatos_observados;
create trigger trg_set_updated_at_fatos_observados
before update on public.fatos_observados
for each row
execute function public.set_updated_at_fatos_observados();

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

alter table public.fatos_observados enable row level security;

drop policy if exists fatos_observados_select on public.fatos_observados;
drop policy if exists fatos_observados_insert on public.fatos_observados;
drop policy if exists fatos_observados_update on public.fatos_observados;
drop policy if exists fatos_observados_delete on public.fatos_observados;

create policy fatos_observados_select
on public.fatos_observados
for select
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = fatos_observados.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy fatos_observados_insert
on public.fatos_observados
for insert
to authenticated
with check (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = fatos_observados.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy fatos_observados_update
on public.fatos_observados
for update
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = fatos_observados.id
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
    join public.quadro_organizacional q on q.id = fatos_observados.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy fatos_observados_delete
on public.fatos_observados
for delete
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = fatos_observados.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

insert into public.fatos_observados (
  id_fo,
  id,
  data,
  tipo,
  descricao,
  autor,
  updated_at
)
values
  ('fo-001', 'mil-001', '2026-02-10', 'FO+', 'Conduziu briefing operacional com clareza e objetividade', 'Ten Costa', '2026-03-01T13:10:48.676Z'),
  ('fo-002', 'mil-001', '2026-02-19', 'FO-', 'Atraso de 12 minutos na formatura matinal', 'Sgt Lima', '2026-03-01T13:10:48.676Z'),
  ('fo-003', 'mil-006', '2026-02-21', 'FO+', 'Excelente desempenho no apoio logistico da instrucao', 'Ten Prado', '2026-03-01T13:10:48.676Z'),
  ('fo-004', 'mil-003', '2026-02-25', 'FO+', 'Atualizou relatorios administrativos sem pendencias', 'Adjunto', '2026-03-01T13:10:48.676Z'),
  ('fo-005', 'mil-010', '2026-02-26', 'FO-', 'Nao apresentou material individual completo', 'Cb Rocha', '2026-03-01T13:10:48.676Z'),
  ('fo-006', 'mil-012', '2026-02-27', 'FO+', 'Instrucao de tiro conduzida com padrao elevado', 'Cap De Souza', '2026-03-01T13:10:48.676Z'),
  ('fo-007', 'mil-014', '2026-02-27', 'FO+', 'Comunicacao de radio eficiente em exercicio noturno', 'Ten Costa', '2026-03-01T13:10:48.676Z'),
  ('fo-008', 'mil-015', '2026-02-28', 'FO-', 'Faltou revisao de kit de primeiros socorros', 'Cb Ramos', '2026-03-01T13:10:48.676Z'),
  ('fo-009', 'mil-005', '2026-02-28', 'FO+', 'Coordenou deslocamento tatico com seguranca', 'Sgt Teixeira', '2026-03-01T13:10:48.676Z'),
  ('fo-010', 'mil-011', '2026-03-01', 'FO+', 'Excelente conducao em rota alternativa', 'Cmt Pel', '2026-03-01T13:10:48.676Z')
on conflict (id_fo) do update set
  id = excluded.id,
  data = excluded.data,
  tipo = excluded.tipo,
  descricao = excluded.descricao,
  autor = excluded.autor,
  updated_at = excluded.updated_at;

commit;

