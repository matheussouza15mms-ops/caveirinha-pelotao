# Roadmap de Evolucao - Caveirinha App

## Objetivo Estrategico
Consolidar o app como plataforma administrativa conectada ao Supabase, com controle por pelotao e personalizacao por usuario.

## Status Atual (2026-03-05)
Ja entregue:
- Auth real no Supabase (login/sessao/logout).
- Quadro Organizacional no Supabase.
- Efetivo no Supabase (snapshot por data + RLS por pelotao).
- TAF Dashboard no Supabase com atualizacao de mencoes.
- TAT no Supabase.
- Fatos Observados (FO+/FO-) no Supabase.
- Historico/Obs no Supabase.
- Punicoes no Supabase.
- `usuario_config` para perfil, tema, pelotao e imagem de cabecalho.
- `usuario_config.nome_pelotao` para subtitulo do cabecalho por usuario.
- Controle por pelotao via RLS.
- Imagens por buckets de pelotao.

## Fase 1 - Consolidacao de Dados (concluida)
- Padronizar schema final da tabela `taf` (remover variacoes de coluna).
- Migracao de modulos principais para Supabase concluida.
- Fallback local mantido como contingencia.

## Fase 2 - Governanca e Seguranca
- Revisar policies RLS por nivel de acesso.
- Implementar auditoria (`updated_by`, trilha de alteracoes).
- Hardening de Storage (policies de leitura/escrita por pelotao).

## Fase 3 - Experiencia e Operacao
- Tema dinamico por usuario (`usuario_config.tema`).
- Personalizacao completa de cabecalho por usuario/pelotao.
- Painel administrativo para gestao de usuarios e permissoes.

## Observacao
A API local (`services/api.js`) deve seguir como camada de contrato unico para manter a UI desacoplada da fonte de dados.
