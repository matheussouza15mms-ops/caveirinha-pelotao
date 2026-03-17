# Projeto: Caveirinha App

## Objetivo
Aplicacao web para gestao do quadro organizacional, efetivo, controle sanitario e ficha do militar, com autenticacao real e controle de acesso por pelotao.

## Stack Atual
- HTML5
- CSS3
- JavaScript puro (Vanilla JS)
- Supabase:
  - Auth
  - Postgres
  - Storage
- API layer local (`services/api.js`) com roteamento para Supabase

## Estrutura de Arquivos Relevante
- `index.html`
- `styles.css`
- `app.js`
- `services/supabaseClient.js`
- `services/auth.js`
- `services/api.js`
- `services/quadroService.js`
- `services/efetivoService.js`
- `services/controleSanitarioService.js`
- `services/tafService.js`
- `services/tatService.js`
- `services/fatosObservadosService.js`
- `services/historicoObsService.js`
- `services/punicoesService.js`
- `services/userConfigService.js`
- `services/dataService.js` (fallback local)
- `docs/`
- `supabase/`

## Modulos Ativos
1. Quadro Organizacional
2. Efetivo
3. Controle Sanitario
4. Ficha do Militar
5. Ficha Medica
6. Dados do Militar
7. Fatos Observados FO+/FO-
8. Historico/Obs
9. Punicoes
10. TAF Dashboard
11. TAT
12. Configuracoes do App
13. Login e sessao

## Estado Atual
- Quadro, Efetivo, Controle Sanitario, FO, Historico/Obs, Punicoes, TAF e TAT integrados ao frontend principal.
- Auth real ativo no Supabase.
- `usuario_config` usado para subtitulo, pelotao e nivel de acesso.
- Cabecalho com saudacao dinamica e nome configurado pelo usuario.
- Configuracoes visuais locais em `localStorage`:
  - nome do usuario
  - foto local
  - tema claro/escuro
  - esquema de cor
  - notificacoes ligadas/desligadas
- Controle Sanitario com regras especificas de classificacao para dashboard e filtro por perfil.

## Fonte Oficial da Verdade
- Dados de producao: Supabase.
- Preferencias visuais do app: `localStorage`.
- Fallback local: `dataService.js` em ambiente local/legado.
