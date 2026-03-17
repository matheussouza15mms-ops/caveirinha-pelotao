begin;

create table if not exists public.usuario_config (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  nome_usuario text not null default '',
  imagem_cabecalho text not null default '',
  tema text not null default 'padrao',
  pelotao public.pelotao_enum,
  nome_pelotao text not null default 'PELOPES',
  nivel_acesso public.nivel_acesso_enum not null default 'operador',
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.usuario_config add column if not exists email text;
alter table public.usuario_config add column if not exists nome_usuario text not null default '';
alter table public.usuario_config add column if not exists imagem_cabecalho text not null default '';
alter table public.usuario_config add column if not exists tema text not null default 'padrao';
alter table public.usuario_config add column if not exists pelotao public.pelotao_enum;
alter table public.usuario_config add column if not exists nome_pelotao text not null default 'PELOPES';
alter table public.usuario_config add column if not exists nivel_acesso public.nivel_acesso_enum not null default 'operador';
alter table public.usuario_config add column if not exists ativo boolean not null default true;
alter table public.usuario_config add column if not exists created_at timestamptz not null default now();
alter table public.usuario_config add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_usuario_config_email on public.usuario_config (email);
create index if not exists idx_usuario_config_pelotao on public.usuario_config (pelotao);
create index if not exists idx_usuario_config_nivel_acesso on public.usuario_config (nivel_acesso);

create or replace function public.set_updated_at_usuario_config()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_usuario_config on public.usuario_config;
create trigger trg_set_updated_at_usuario_config
before update on public.usuario_config
for each row
execute function public.set_updated_at_usuario_config();

create or replace function public.parse_pelotao_enum(input_text text)
returns public.pelotao_enum
language plpgsql
immutable
as $$
declare
  v text;
begin
  v := lower(trim(coalesce(input_text, '')));
  v := translate(v, 'áàâãäéèêëíìîïóòôõöúùûüçº°', 'aaaaaeeeeiiiiooooouuuuc  ');
  v := regexp_replace(v, '\s+', ' ', 'g');

  if v = '' then
    return null;
  elsif v like '1%pel%' then
    return '1 pel'::public.pelotao_enum;
  elsif v like '2%pel%' then
    return '2 pel'::public.pelotao_enum;
  elsif v like '3%pel%' then
    return '3 pel'::public.pelotao_enum;
  elsif v like '%pel%ap%' then
    return 'pel ap'::public.pelotao_enum;
  elsif v like '%sec%cmdo%' then
    return 'sec cmdo'::public.pelotao_enum;
  end if;

  return null;
end;
$$;

create or replace function public.parse_nivel_acesso_enum(input_text text)
returns public.nivel_acesso_enum
language plpgsql
immutable
as $$
declare
  v text;
begin
  v := lower(trim(coalesce(input_text, '')));

  if v = '' then
    return 'operador'::public.nivel_acesso_enum;
  elsif v in ('admin', 'administrador') then
    return 'admin'::public.nivel_acesso_enum;
  elsif v in ('comando', 'cmd', 'cmdo') then
    return 'comando'::public.nivel_acesso_enum;
  elsif v in ('operador', 'usuario', 'usuário', 'user') then
    return 'operador'::public.nivel_acesso_enum;
  end if;

  return 'operador'::public.nivel_acesso_enum;
end;
$$;

create or replace function public.sync_usuario_config_from_auth(
  p_user_id uuid,
  p_email text default null,
  p_raw_meta jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_nome_usuario text;
begin
  v_nome_usuario := coalesce(
    nullif(trim(p_raw_meta ->> 'nome_usuario'), ''),
    nullif(trim(p_raw_meta ->> 'nome'), ''),
    nullif(trim(split_part(coalesce(p_email, ''), '@', 1)), ''),
    'Usuario'
  );

  insert into public.usuario_config (
    user_id,
    email,
    nome_usuario,
    imagem_cabecalho,
    tema,
    pelotao,
    nome_pelotao,
    nivel_acesso,
    ativo,
    created_at,
    updated_at
  )
  values (
    p_user_id,
    lower(coalesce(p_email, '')),
    v_nome_usuario,
    '',
    'padrao',
    public.parse_pelotao_enum(p_raw_meta ->> 'pelotao'),
    coalesce(nullif(trim(p_raw_meta ->> 'nome_pelotao'), ''), 'PELOPES'),
    public.parse_nivel_acesso_enum(p_raw_meta ->> 'nivel_acesso'),
    true,
    now(),
    now()
  )
  on conflict (user_id) do update
    set email = excluded.email,
        nome_usuario = case
          when coalesce(trim(public.usuario_config.nome_usuario), '') = '' then excluded.nome_usuario
          else public.usuario_config.nome_usuario
        end,
        pelotao = case
          when coalesce(trim(public.usuario_config.pelotao), '') = '' then excluded.pelotao
          else public.usuario_config.pelotao
        end,
        nome_pelotao = case
          when coalesce(trim(public.usuario_config.nome_pelotao), '') in ('', 'PELOPES') then excluded.nome_pelotao
          else public.usuario_config.nome_pelotao
        end,
        nivel_acesso = case
          when coalesce(trim(public.usuario_config.nivel_acesso), '') = '' then excluded.nivel_acesso
          else public.usuario_config.nivel_acesso
        end,
        ativo = true,
        updated_at = now();
end;
$$;

create or replace function public.handle_auth_user_created()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  perform public.sync_usuario_config_from_auth(new.id, new.email, coalesce(new.raw_user_meta_data, '{}'::jsonb));
  return new;
end;
$$;

insert into public.usuario_config (
  user_id,
  email,
  nome_usuario,
  imagem_cabecalho,
  tema,
  pelotao,
  nome_pelotao,
  nivel_acesso,
  ativo,
  created_at,
  updated_at
)
select
  u.id,
  lower(coalesce(u.email, '')),
  coalesce(
    nullif(trim(u.raw_user_meta_data ->> 'nome_usuario'), ''),
    nullif(trim(u.raw_user_meta_data ->> 'nome'), ''),
    nullif(trim(split_part(coalesce(u.email, ''), '@', 1)), ''),
    'Usuario'
  ),
  '',
  'padrao',
  public.parse_pelotao_enum(u.raw_user_meta_data ->> 'pelotao'),
  coalesce(nullif(trim(u.raw_user_meta_data ->> 'nome_pelotao'), ''), 'PELOPES'),
  public.parse_nivel_acesso_enum(u.raw_user_meta_data ->> 'nivel_acesso'),
  true,
  now(),
  now()
from auth.users u
on conflict (user_id) do update
  set email = excluded.email,
      ativo = true,
      updated_at = now();

drop trigger if exists on_auth_user_created_usuario_config on auth.users;
create trigger on_auth_user_created_usuario_config
after insert on auth.users
for each row
execute function public.handle_auth_user_created();

alter table public.usuario_config enable row level security;

drop policy if exists usuario_config_self_select on public.usuario_config;
drop policy if exists usuario_config_self_update on public.usuario_config;
drop policy if exists usuario_config_admin_all on public.usuario_config;

create policy usuario_config_self_select
on public.usuario_config
for select
to authenticated
using (auth.uid() = user_id);

create policy usuario_config_self_update
on public.usuario_config
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy usuario_config_admin_all
on public.usuario_config
for all
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and lower(coalesce(uc.nivel_acesso, '')) in ('admin', 'comando')
  )
)
with check (
  exists (
    select 1
    from public.usuario_config uc
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and lower(coalesce(uc.nivel_acesso, '')) in ('admin', 'comando')
  )
);

grant execute on function public.sync_usuario_config_from_auth(uuid, text, jsonb) to authenticated, service_role;

commit;
