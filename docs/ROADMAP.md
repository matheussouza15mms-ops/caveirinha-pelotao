# Roadmap de Evolucao - Caveirinha App

## Objetivo Estrategico
Consolidar o app como plataforma administrativa conectada ao Supabase, com controle por pelotao e personalizacao por usuario.

## Status Atual (2026-03-04)
Ja entregue:
- Auth real no Supabase (login/sessao/logout).
- Quadro Organizacional no Supabase.
- TAF Dashboard no Supabase com atualizacao de mencoes.
- Fatos Observados (FO+/FO-) no Supabase.
- `usuario_config` para perfil, tema, pelotao e imagem de cabecalho.
- Controle por pelotao via RLS.
- Imagens por buckets de pelotao.

## Fase 1 - Consolidacao de Dados (em andamento)
- Padronizar schema final da tabela `taf` (remover variacoes de coluna).
- Migrar completamente modulos restantes para Supabase:
  - Efetivo
  - Historico/Obs
  - Punicoes
  - TAT
- Eliminar fallback local quando tudo estiver migrado.

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
