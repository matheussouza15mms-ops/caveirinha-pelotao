-- Caveirinha App - Estrutura base de public.quadro_organizacional
-- Fonte: introspeccao do projeto remoto no Supabase

begin;

create table if not exists public.quadro_organizacional (
  id text primary key,
  pg text not null default '',
  numero text not null default '',
  nome_guerra text not null default '',
  funcao text not null default '',
  fracao text not null default '',
  foto text not null default '',
  nome_completo text not null default '',
  data_nascimento date,
  identidade text not null default '',
  data_praca date,
  endereco text not null default '',
  celular text not null default '',
  nome_pai text not null default '',
  nome_mae text not null default '',
  contato_emergencia text not null default '',
  comportamento text not null default '',
  habilidade text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  pelotao text
);

alter table public.quadro_organizacional add column if not exists id text;
alter table public.quadro_organizacional add column if not exists pg text not null default '';
alter table public.quadro_organizacional add column if not exists numero text not null default '';
alter table public.quadro_organizacional add column if not exists nome_guerra text not null default '';
alter table public.quadro_organizacional add column if not exists funcao text not null default '';
alter table public.quadro_organizacional add column if not exists fracao text not null default '';
alter table public.quadro_organizacional add column if not exists foto text not null default '';
alter table public.quadro_organizacional add column if not exists nome_completo text not null default '';
alter table public.quadro_organizacional add column if not exists data_nascimento date;
alter table public.quadro_organizacional add column if not exists identidade text not null default '';
alter table public.quadro_organizacional add column if not exists data_praca date;
alter table public.quadro_organizacional add column if not exists endereco text not null default '';
alter table public.quadro_organizacional add column if not exists celular text not null default '';
alter table public.quadro_organizacional add column if not exists nome_pai text not null default '';
alter table public.quadro_organizacional add column if not exists nome_mae text not null default '';
alter table public.quadro_organizacional add column if not exists contato_emergencia text not null default '';
alter table public.quadro_organizacional add column if not exists comportamento text not null default '';
alter table public.quadro_organizacional add column if not exists habilidade text not null default '';
alter table public.quadro_organizacional add column if not exists created_at timestamptz not null default now();
alter table public.quadro_organizacional add column if not exists updated_at timestamptz not null default now();
alter table public.quadro_organizacional add column if not exists pelotao text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.quadro_organizacional'::regclass
      and contype = 'p'
  ) then
    execute 'alter table public.quadro_organizacional add primary key (id)';
  end if;
end $$;

create index if not exists idx_quadro_pg on public.quadro_organizacional (pg);
create index if not exists idx_quadro_nome_guerra on public.quadro_organizacional (nome_guerra);
create index if not exists idx_quadro_fracao on public.quadro_organizacional (fracao);
create index if not exists idx_quadro_pelotao on public.quadro_organizacional (pelotao);

create or replace function public.set_updated_at_quadro()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_quadro on public.quadro_organizacional;
create trigger trg_set_updated_at_quadro
before update on public.quadro_organizacional
for each row
execute function public.set_updated_at_quadro();

commit;
