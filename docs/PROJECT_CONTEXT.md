# Projeto: Caveirinha App

## Objetivo
Aplicacao web para gestao do quadro organizacional, efetivo e ficha do militar, com autenticacao real e controle de acesso por pelotao.

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
- `services/tafService.js`
- `services/tatService.js`
- `services/fatosObservadosService.js`
- `services/historicoObsService.js`
- `services/punicoesService.js`
- `services/userConfigService.js`
- `services/dataService.js` (fallback local)
- `docs/`
- `supabase/` (scripts SQL de criacao/migracao de tabelas)

## Modulos Ativos
1. Quadro Organizacional
2. Efetivo
3. Ficha do Militar
4. Dados do Militar (modal)
5. Fatos Observados FO+/FO- (CRUD)
6. Historico/Obs (CRUD)
7. Punicoes (CRUD)
8. TAF Dashboard (1º, 2º, 3º)
9. TAT (edicao de mencao)
10. Login e sessao

## Estado Atual
- Quadro, Efetivo, FO, Historico/Obs, Punicoes, TAF e TAT integrados ao Supabase.
- Login mock removido; Auth real ativo.
- `usuario_config` usado para comportamento por usuario.
- `usuario_config.nome_pelotao` usado para subtitulo do cabecalho.
- Filtro por pelotao aplicado no banco via RLS.
- Imagens resolvidas por bucket de pelotao.

## Fonte Oficial da Verdade
- Dados de producao: Supabase.
- Fallback local: CSV em ambiente local/legado.
