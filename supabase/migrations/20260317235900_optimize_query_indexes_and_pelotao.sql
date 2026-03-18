begin;

create index if not exists idx_taf_id_data_created_at
  on public.taf (id, data desc, created_at desc);

create index if not exists idx_tat_id_data_created_at
  on public.tat (id, data desc, created_at desc);

create index if not exists idx_fatos_observados_id_tipo_data_created_at
  on public.fatos_observados (id, tipo, data desc, created_at desc);

create index if not exists idx_historico_obs_id_data_created_at
  on public.historico_obs (id, data desc, created_at desc);

create index if not exists idx_punicoes_id_data_inicio_created_at
  on public.punicoes (id, data_inicio desc, created_at desc);

create index if not exists idx_controle_sanitario_id_data_visita_created_at
  on public.controle_sanitario (id, data_visita desc nulls last, created_at desc);

create index if not exists idx_controle_sanitario_pelotao_data_visita
  on public.controle_sanitario (pelotao, data_visita desc nulls last);

commit;
