begin;

create or replace function public.caveirinha_is_global_access()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.usuario_config uc
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and lower(coalesce(uc.nivel_acesso::text, '')) in ('admin', 'comando')
  );
$$;

create or replace function public.caveirinha_user_pelotao_normalized()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select public.caveirinha_normalize_pelotao(uc.pelotao::text)
  from public.usuario_config uc
  where uc.user_id = auth.uid()
    and uc.ativo = true
  limit 1;
$$;

create or replace function public.caveirinha_can_access_pelotao(target_pelotao text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.caveirinha_is_global_access()
    or public.caveirinha_user_pelotao_normalized() =
       public.caveirinha_normalize_pelotao(target_pelotao);
$$;

create or replace function public.caveirinha_can_access_militar(militar_id text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.quadro_organizacional q
    where q.id = militar_id
      and public.caveirinha_can_access_pelotao(q.pelotao::text)
  );
$$;

alter table public.quadro_organizacional enable row level security;

drop policy if exists quadro_select on public.quadro_organizacional;
drop policy if exists quadro_insert on public.quadro_organizacional;
drop policy if exists quadro_update on public.quadro_organizacional;
drop policy if exists quadro_delete on public.quadro_organizacional;

create policy quadro_select on public.quadro_organizacional
for select to authenticated
using (public.caveirinha_can_access_pelotao(public.quadro_organizacional.pelotao::text));

create policy quadro_insert on public.quadro_organizacional
for insert to authenticated
with check (public.caveirinha_can_access_pelotao(public.quadro_organizacional.pelotao::text));

create policy quadro_update on public.quadro_organizacional
for update to authenticated
using (public.caveirinha_can_access_pelotao(public.quadro_organizacional.pelotao::text))
with check (public.caveirinha_can_access_pelotao(public.quadro_organizacional.pelotao::text));

create policy quadro_delete on public.quadro_organizacional
for delete to authenticated
using (public.caveirinha_can_access_pelotao(public.quadro_organizacional.pelotao::text));

commit;
