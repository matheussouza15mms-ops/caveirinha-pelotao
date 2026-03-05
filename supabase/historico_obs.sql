-- Caveirinha App - Migracao Historico/Obs para schema id_historico (PK) + id (FK quadro_organizacional.id)
-- Script idempotente (pode rodar mais de uma vez)

begin;

create table if not exists public.historico_obs (
  id_historico text primary key,
  id text not null,
  texto text not null,
  autor text not null,
  data date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  -- Migra schema legado CSV: historicoId,id,texto,autor,data,lastUpdate
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'historico_obs' and column_name = 'historicoid'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'historico_obs' and column_name = 'id_historico'
  ) then
    execute 'alter table public.historico_obs rename column historicoid to id_historico';
  end if;
end $$;

alter table public.historico_obs add column if not exists id_historico text;
alter table public.historico_obs add column if not exists id text;
alter table public.historico_obs add column if not exists texto text;
alter table public.historico_obs add column if not exists autor text;
alter table public.historico_obs add column if not exists data date;
alter table public.historico_obs add column if not exists created_at timestamptz not null default now();
alter table public.historico_obs add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_historico_obs_id on public.historico_obs (id);
create index if not exists idx_historico_obs_data on public.historico_obs (data desc);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.historico_obs'::regclass
      and contype = 'p'
  ) then
    execute 'alter table public.historico_obs add primary key (id_historico)';
  end if;
end $$;

alter table public.historico_obs drop constraint if exists historico_obs_id_fkey;
alter table public.historico_obs
  add constraint historico_obs_id_fkey
  foreign key (id)
  references public.quadro_organizacional (id)
  on update cascade
  on delete cascade;

create or replace function public.set_updated_at_historico_obs()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_historico_obs on public.historico_obs;
create trigger trg_set_updated_at_historico_obs
before update on public.historico_obs
for each row
execute function public.set_updated_at_historico_obs();

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

alter table public.historico_obs enable row level security;

drop policy if exists historico_obs_select on public.historico_obs;
drop policy if exists historico_obs_insert on public.historico_obs;
drop policy if exists historico_obs_update on public.historico_obs;
drop policy if exists historico_obs_delete on public.historico_obs;

create policy historico_obs_select
on public.historico_obs
for select
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = historico_obs.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy historico_obs_insert
on public.historico_obs
for insert
to authenticated
with check (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = historico_obs.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy historico_obs_update
on public.historico_obs
for update
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = historico_obs.id
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
    join public.quadro_organizacional q on q.id = historico_obs.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

create policy historico_obs_delete
on public.historico_obs
for delete
to authenticated
using (
  exists (
    select 1
    from public.usuario_config uc
    join public.quadro_organizacional q on q.id = historico_obs.id
    where uc.user_id = auth.uid()
      and uc.ativo = true
      and (
        uc.nivel_acesso::text = 'admin'
        or public.caveirinha_normalize_pelotao(uc.pelotao::text) =
           public.caveirinha_normalize_pelotao(q.pelotao::text)
      )
  )
);

insert into public.historico_obs (
  id_historico,
  id,
  texto,
  autor,
  data,
  updated_at
)
values
  ('hist-001', 'mil-001', 'Participou da reuniao de comando e apresentou proposta de melhoria', 'Adjunto', '2026-02-26', '2026-03-01T14:32:13.492Z'),
  ('hist-002', 'mil-003', 'Observacao administrativa sobre revisao documental', 'Adjunto', '2026-02-27', '2026-03-01T14:32:13.492Z'),
  ('hist-003', 'mil-006', 'Acompanhamento de adaptacao inicial na fracao com bom progresso', 'Adjunto', '2026-02-28', '2026-03-01T14:32:13.492Z'),
  ('hist-004', 'mil-010', 'Encaminhado para reforco de treinamento fisico', 'Sgt Melo', '2026-02-28', '2026-03-01T14:32:13.492Z'),
  ('hist-005', 'mil-012', 'Designado para instrucao extra de tiro para novos soldados', 'Cap De Souza', '2026-03-01', '2026-03-01T14:32:13.492Z'),
  ('hist-006', 'mil-014', 'Registrado bom desempenho em comunicacoes sob pressao', 'Ten Costa', '2026-03-01', '2026-03-01T14:32:13.492Z'),
  ('hist-007', 'mil-015', 'Observacao de necessidade de padronizacao do material medico', 'Cb Ramos', '2026-03-01', '2026-03-01T14:32:13.492Z'),
  ('hist-008', 'mil-005', 'Apresentou plano de melhoria de escala operacional', 'Sgt Lima', '2026-03-01', '2026-03-01T14:32:13.492Z')
on conflict (id_historico) do update set
  id = excluded.id,
  texto = excluded.texto,
  autor = excluded.autor,
  data = excluded.data,
  updated_at = excluded.updated_at;

commit;

