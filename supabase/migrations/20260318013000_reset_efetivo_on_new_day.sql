begin;

create or replace function public.seed_efetivo_dia(
  p_data date default null
)
returns void
language plpgsql
security definer
as $$
declare
  v_data date;
begin
  v_data := coalesce(p_data, public.caveirinha_data_hoje_br());

  insert into public.efetivo (
    id_efetivo,
    id,
    data_referencia,
    em_forma,
    situacao,
    pelotao,
    created_at,
    updated_at
  )
  select
    'ef-' || q.id,
    q.id,
    v_data,
    false,
    ''::text,
    q.pelotao,
    now(),
    now()
  from public.quadro_organizacional q
  where coalesce(btrim(q.id), '') <> ''
  on conflict (id) do update
    set data_referencia = excluded.data_referencia,
        em_forma = false,
        situacao = ''::text,
        pelotao = excluded.pelotao,
        updated_at = now();
end;
$$;

grant execute on function public.seed_efetivo_dia(date) to anon, authenticated;

commit;
