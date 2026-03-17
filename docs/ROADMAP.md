# Roadmap de Evolucao - Caveirinha App

## Objetivo Estrategico
Consolidar o app como plataforma administrativa conectada ao Supabase, com controle por pelotao, controle sanitario e personalizacao por usuario.

## Status Atual (2026-03-17)
Ja entregue:
- Auth real no Supabase.
- Quadro Organizacional no Supabase.
- Efetivo no Supabase.
- TAF Dashboard no Supabase.
- TAT no Supabase.
- Fatos Observados no Supabase.
- Historico/Obs no Supabase.
- Punicoes no Supabase.
- Controle Sanitario no frontend com dashboard, Ficha Medica e leitura do Supabase.
- `usuario_config` para perfil, pelotao, subtitulo e imagem de cabecalho.
- Configuracoes locais de tema, cor, nome e notificacoes.
- Saudacao dinamica no cabecalho com nome do usuario.
- `Relatar um problema` via WhatsApp.

## Fase 1 - Consolidacao de Dados
Concluida:
- Migracao dos modulos principais para Supabase.
- Fallback local mantido como contingencia.

Em andamento:
- Consolidar o fluxo completo do Controle Sanitario entre Google Sheets, Supabase e app.

## Fase 2 - Governanca e Seguranca
- Revisar policies RLS por nivel de acesso.
- Implementar auditoria (`updated_by`, trilha de alteracoes).
- Hardening de Storage por pelotao.
- Evoluir `Seguranca` nas Configuracoes para troca de senha real.

## Fase 3 - Experiencia e Operacao
- Persistir configuracoes do app no Supabase por usuario.
- Completar tela de Configuracoes com fluxos reais para ajuda, termos e suporte.
- Criar painel administrativo para gestao de usuarios e permissoes.
- Evoluir a tela de Missoes.

## Observacao
A API local (`services/api.js`) deve seguir como camada de contrato unico para manter a UI desacoplada da fonte de dados.
