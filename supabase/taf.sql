-- Caveirinha App - Estrutura base de public.taf
-- Fonte: introspeccao do projeto remoto no Supabase

begin;

create table if not exists public.taf (
  taf_id text primary key,
  id text not null,
  data date not null,
  tipo_teste text not null,
  resultado text not null,
  observacao text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  pelotao text
);

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'taf'
      and column_name = 'id_militar'
  ) and exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'taf'
      and column_name = 'id'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'taf'
      and column_name = 'taf_id'
  ) then
    execute 'alter table public.taf rename column id to taf_id';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'taf'
      and column_name = 'id_militar'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'taf'
      and column_name = 'id'
  ) then
    execute 'alter table public.taf rename column id_militar to id';
  end if;
end $$;

alter table public.taf add column if not exists taf_id text;
alter table public.taf add column if not exists id text;
alter table public.taf add column if not exists data date;
alter table public.taf add column if not exists tipo_teste text;
alter table public.taf add column if not exists resultado text;
alter table public.taf add column if not exists observacao text not null default '';
alter table public.taf add column if not exists created_at timestamptz not null default now();
alter table public.taf add column if not exists updated_at timestamptz not null default now();
alter table public.taf add column if not exists pelotao text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.taf'::regclass
      and contype = 'p'
  ) then
    execute 'alter table public.taf add primary key (taf_id)';
  end if;
end $$;

create index if not exists idx_taf_id on public.taf (id);
create index if not exists idx_taf_pelotao on public.taf (pelotao);
create unique index if not exists uq_taf_id_tipo_teste on public.taf (id, tipo_teste);

alter table public.taf drop constraint if exists fk_taf_quadro_id;
alter table public.taf drop constraint if exists taf_id_fkey;
alter table public.taf
  add constraint fk_taf_quadro_id
  foreign key (id)
  references public.quadro_organizacional (id)
  on update cascade
  on delete cascade;

create or replace function public.set_updated_at_taf()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_taf on public.taf;
create trigger trg_set_updated_at_taf
before update on public.taf
for each row
execute function public.set_updated_at_taf();

commit;
