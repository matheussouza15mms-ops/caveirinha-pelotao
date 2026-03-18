# Arquitetura do Sistema

## Padrao Arquitetural
Separacao de responsabilidades sem framework:
- UI e renderizacao: `app.js`
- Estado local de tela: `organizacao`, `indiceMilitares`, `efetivoState`, caches de modais e listas do controle sanitario
- API layer e roteamento: `services/api.js`
- Integracao Supabase:
  - Cliente: `services/supabaseClient.js`
  - Auth: `services/auth.js`
  - Quadro: `services/quadroService.js`
  - Efetivo: `services/efetivoService.js`
  - Controle Sanitario: `services/controleSanitarioService.js`
  - FO: `services/fatosObservadosService.js`
  - Historico/Obs: `services/historicoObsService.js`
  - Punicoes: `services/punicoesService.js`
  - TAF: `services/tafService.js`
  - TAT: `services/tatService.js`
  - Configuracao por usuario: `services/userConfigService.js`
- Fallback local: `services/dataService.js`

## Fluxo de Dados Atual
1. `app.js` consome `window.CaveirinhaAPI`.
2. `services/api.js` roteia para Supabase quando o servico existe.
3. Se o modulo Supabase nao estiver disponivel, a chamada cai no fallback local.
4. A UI renderiza pelo estado local, sem acesso direto ao banco.

## Auth e Sessao
- Login real com Supabase Auth.
- Sessao validada antes da inicializacao da aplicacao.
- "Manter logado" controlado no cliente.
- Mesmo com sessao ativa, o usuario precisa clicar em `Entrar`.

## Controle de Acesso
- Baseado em `usuario_config` + RLS no Supabase.
- `comando/admin` podem ver estrutura geral.
- Demais usuarios visualizam dados do proprio pelotao.
- O Controle Sanitario tambem respeita essa visibilidade no frontend.

## Storage de Imagens
- Resolucao de imagens por pelotao com buckets dedicados.
- Mapeamento atual:
  - `1º Pel -> imagens-1pel`
  - `2º Pel -> imagens-2pel`
  - `3º Pel -> imagens-3pel`
  - `Pel Ap -> imagens-pelap`
  - `Seç Cmdo -> imagens-seccmdo`
- Fluxo:
  - tenta signed URL
  - fallback para URL publica

## Personalizacao do App
- `usuario_config.nome_pelotao` define o subtitulo do cabecalho.
- Preferencias locais ficam em `localStorage`:
  - `displayName`
  - `profilePhoto`
  - `theme`
  - `colorScheme`
  - `notificationsEnabled`
- O nome configurado alimenta a saudacao dinamica do cabecalho.
- `data-color-scheme` altera a cor do cabecalho e do menu.
- `data-theme` alterna entre light/dark.

## Controle Sanitario
- Fonte principal: `public.controle_sanitario`.
- Servico frontend: `services/controleSanitarioService.js`.
- Dashboard com classificacao por regra de negocio:
  - `Dispensado de atividade fisica` e `Outros` contam como `Dispensado`
  - demais situacoes diferentes de `Normalidade` contam como `Baixado`
  - `Internado` segue separado
- Ficha Medica reutiliza os mesmos registros e calcula a situacao atual do militar.

## Compatibilidade Preservada
- `organizacao`
- `indiceMilitares`
- `efetivoState`
- `renderTabs()`
- `renderCards()`
- `renderEfetivo()`
- `setScreen()`

## Otimizacoes Atuais
- cache local por sessao para `usuario_config`, `quadro`, `efetivo` por data e detalhe do militar
- busca local com debounce e texto pre-processado no indice
- realtime com tentativa de atualizacao incremental antes de refetch completo
- imagens de cabecalho e foto da ficha com reaproveitamento de URL resolvida para reduzir chamadas ao Storage
