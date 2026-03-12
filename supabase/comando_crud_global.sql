-- Permissoes RLS para nivel_acesso = 'comando'
-- Objetivo:
-- 1) Usuario "comando" (e "admin") com CRUD global em todas as tabelas do app.
-- 2) Demais niveis continuam restritos ao proprio pelotao.

begin;

create or replace function public.caveirinha_normalize_pelotao(input_text text)
returns text
language sql
immutable
as $$
  select regexp_replace(
    lower(
      translate(
        coalesce(input_text, ''),
        'ÁÀÂÃÄáàâãäÉÈÊËéèêëÍÌÎÏíìîïÓÒÔÕÖóòôõöÚÙÛÜúùûüÇçº°',
        'AAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuCc  '
      )
    ),
    '\s+',
    ' ',
    'g'
  );
$$;

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
      and lower(coalesce(uc.nivel_acesso::text, '')) in ('admin', 'comando')
  );
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
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = militar_id
    where uc.user_id = auth.uid()
      and (
        lower(coalesce(uc.nivel_acesso::text, '')) in ('admin', 'comando')
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  );
$$;

-- QUADRO ORGANIZACIONAL
alter table public.quadro_organizacional enable row level security;

drop policy if exists quadro_select on public.quadro_organizacional;
drop policy if exists quadro_insert on public.quadro_organizacional;
drop policy if exists quadro_update on public.quadro_organizacional;
drop policy if exists quadro_delete on public.quadro_organizacional;

create policy quadro_select on public.quadro_organizacional
for select to authenticated
using (
  public.caveirinha_is_global_access()
  or exists (
    select 1 from public.usuario_config uc
    where uc.user_id = auth.uid()
      and public.caveirinha_normalize_pelotao(uc.pelotao::text) =
          public.caveirinha_normalize_pelotao(public.quadro_organizacional.pelotao::text)
  )
);

create policy quadro_insert on public.quadro_organizacional
for insert to authenticated
with check (
  public.caveirinha_is_global_access()
  or exists (
    select 1 from public.usuario_config uc
    where uc.user_id = auth.uid()
      and public.caveirinha_normalize_pelotao(uc.pelotao::text) =
          public.caveirinha_normalize_pelotao(public.quadro_organizacional.pelotao::text)
  )
);

create policy quadro_update on public.quadro_organizacional
for update to authenticated
using (
  public.caveirinha_is_global_access()
  or exists (
    select 1 from public.usuario_config uc
    where uc.user_id = auth.uid()
      and public.caveirinha_normalize_pelotao(uc.pelotao::text) =
          public.caveirinha_normalize_pelotao(public.quadro_organizacional.pelotao::text)
  )
)
with check (
  public.caveirinha_is_global_access()
  or exists (
    select 1 from public.usuario_config uc
    where uc.user_id = auth.uid()
      and public.caveirinha_normalize_pelotao(uc.pelotao::text) =
          public.caveirinha_normalize_pelotao(public.quadro_organizacional.pelotao::text)
  )
);

create policy quadro_delete on public.quadro_organizacional
for delete to authenticated
using (
  public.caveirinha_is_global_access()
  or exists (
    select 1 from public.usuario_config uc
    where uc.user_id = auth.uid()
      and public.caveirinha_normalize_pelotao(uc.pelotao::text) =
          public.caveirinha_normalize_pelotao(public.quadro_organizacional.pelotao::text)
  )
);

-- TABELAS VINCULADAS POR id DO MILITAR
alter table public.efetivo enable row level security;
alter table public.taf enable row level security;
alter table public.tat enable row level security;
alter table public.fatos_observados enable row level security;
alter table public.historico_obs enable row level security;
alter table public.punicoes enable row level security;

drop policy if exists efetivo_select on public.efetivo;
drop policy if exists efetivo_insert on public.efetivo;
drop policy if exists efetivo_update on public.efetivo;
drop policy if exists efetivo_delete on public.efetivo;

create policy efetivo_select on public.efetivo for select to authenticated
using (public.caveirinha_can_access_militar(public.efetivo.id));
create policy efetivo_insert on public.efetivo for insert to authenticated
with check (public.caveirinha_can_access_militar(public.efetivo.id));
create policy efetivo_update on public.efetivo for update to authenticated
using (public.caveirinha_can_access_militar(public.efetivo.id))
with check (public.caveirinha_can_access_militar(public.efetivo.id));
create policy efetivo_delete on public.efetivo for delete to authenticated
using (public.caveirinha_can_access_militar(public.efetivo.id));

drop policy if exists taf_select on public.taf;
drop policy if exists taf_insert on public.taf;
drop policy if exists taf_update on public.taf;
drop policy if exists taf_delete on public.taf;

create policy taf_select on public.taf for select to authenticated
using (public.caveirinha_can_access_militar(public.taf.id));
create policy taf_insert on public.taf for insert to authenticated
with check (public.caveirinha_can_access_militar(public.taf.id));
create policy taf_update on public.taf for update to authenticated
using (public.caveirinha_can_access_militar(public.taf.id))
with check (public.caveirinha_can_access_militar(public.taf.id));
create policy taf_delete on public.taf for delete to authenticated
using (public.caveirinha_can_access_militar(public.taf.id));

drop policy if exists tat_select on public.tat;
drop policy if exists tat_insert on public.tat;
drop policy if exists tat_update on public.tat;
drop policy if exists tat_delete on public.tat;

create policy tat_select on public.tat for select to authenticated
using (public.caveirinha_can_access_militar(public.tat.id));
create policy tat_insert on public.tat for insert to authenticated
with check (public.caveirinha_can_access_militar(public.tat.id));
create policy tat_update on public.tat for update to authenticated
using (public.caveirinha_can_access_militar(public.tat.id))
with check (public.caveirinha_can_access_militar(public.tat.id));
create policy tat_delete on public.tat for delete to authenticated
using (public.caveirinha_can_access_militar(public.tat.id));

drop policy if exists fatos_observados_select on public.fatos_observados;
drop policy if exists fatos_observados_insert on public.fatos_observados;
drop policy if exists fatos_observados_update on public.fatos_observados;
drop policy if exists fatos_observados_delete on public.fatos_observados;

create policy fatos_observados_select on public.fatos_observados for select to authenticated
using (public.caveirinha_can_access_militar(public.fatos_observados.id));
create policy fatos_observados_insert on public.fatos_observados for insert to authenticated
with check (public.caveirinha_can_access_militar(public.fatos_observados.id));
create policy fatos_observados_update on public.fatos_observados for update to authenticated
using (public.caveirinha_can_access_militar(public.fatos_observados.id))
with check (public.caveirinha_can_access_militar(public.fatos_observados.id));
create policy fatos_observados_delete on public.fatos_observados for delete to authenticated
using (public.caveirinha_can_access_militar(public.fatos_observados.id));

drop policy if exists historico_obs_select on public.historico_obs;
drop policy if exists historico_obs_insert on public.historico_obs;
drop policy if exists historico_obs_update on public.historico_obs;
drop policy if exists historico_obs_delete on public.historico_obs;

create policy historico_obs_select on public.historico_obs for select to authenticated
using (public.caveirinha_can_access_militar(public.historico_obs.id));
create policy historico_obs_insert on public.historico_obs for insert to authenticated
with check (public.caveirinha_can_access_militar(public.historico_obs.id));
create policy historico_obs_update on public.historico_obs for update to authenticated
using (public.caveirinha_can_access_militar(public.historico_obs.id))
with check (public.caveirinha_can_access_militar(public.historico_obs.id));
create policy historico_obs_delete on public.historico_obs for delete to authenticated
using (public.caveirinha_can_access_militar(public.historico_obs.id));

drop policy if exists punicoes_select on public.punicoes;
drop policy if exists punicoes_insert on public.punicoes;
drop policy if exists punicoes_update on public.punicoes;
drop policy if exists punicoes_delete on public.punicoes;

create policy punicoes_select on public.punicoes for select to authenticated
using (public.caveirinha_can_access_militar(public.punicoes.id));
create policy punicoes_insert on public.punicoes for insert to authenticated
with check (public.caveirinha_can_access_militar(public.punicoes.id));
create policy punicoes_update on public.punicoes for update to authenticated
using (public.caveirinha_can_access_militar(public.punicoes.id))
with check (public.caveirinha_can_access_militar(public.punicoes.id));
create policy punicoes_delete on public.punicoes for delete to authenticated
using (public.caveirinha_can_access_militar(public.punicoes.id));

-- USUARIO_CONFIG (somente admin/comando podem CRUD global)
alter table public.usuario_config enable row level security;

drop policy if exists usuario_config_select on public.usuario_config;
drop policy if exists usuario_config_insert on public.usuario_config;
drop policy if exists usuario_config_update on public.usuario_config;
drop policy if exists usuario_config_delete on public.usuario_config;

create policy usuario_config_select on public.usuario_config
for select to authenticated
using (
  public.caveirinha_is_global_access()
  or user_id = auth.uid()
);

create policy usuario_config_insert on public.usuario_config
for insert to authenticated
with check (
  public.caveirinha_is_global_access()
  or user_id = auth.uid()
);

create policy usuario_config_update on public.usuario_config
for update to authenticated
using (
  public.caveirinha_is_global_access()
  or user_id = auth.uid()
)
with check (
  public.caveirinha_is_global_access()
  or user_id = auth.uid()
);

create policy usuario_config_delete on public.usuario_config
for delete to authenticated
using (public.caveirinha_is_global_access());

commit;

