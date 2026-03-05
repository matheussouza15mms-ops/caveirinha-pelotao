# Arquitetura do Sistema

## Padrao Arquitetural
Separacao de responsabilidades sem framework:
- UI e renderizacao: `app.js`
- Estado local de tela: `organizacao`, `indiceMilitares`, `efetivoState`
- API layer e roteamento: `services/api.js`
- Integracao Supabase:
  - Cliente: `services/supabaseClient.js`
  - Auth: `services/auth.js`
  - Quadro: `services/quadroService.js`
  - TAF: `services/tafService.js`
  - Configuracao por usuario: `services/userConfigService.js`
- Fallback local (legado/hibrido): `services/dataService.js`

## Fluxo de Dados Atual
1. `app.js` consome `window.CaveirinhaAPI`.
2. `services/api.js` roteia para Supabase quando o modulo existe.
3. Se modulo nao estiver migrado, cai no fallback local (CSV via `dataService`).
4. A UI renderiza pelo estado local, sem acesso direto ao banco.

## Auth e Sessao
- Login real com Supabase Auth (`signInWithPassword`).
- Sessao validada antes da inicializacao da aplicacao.
- "Manter logado" controlado no cliente.
- Mesmo com sessao ativa, o usuario precisa clicar em `Entrar`.

## Storage de Imagens
- Resolucao de imagens por pelotao com buckets dedicados.
- Mapeamento atual:
  - `1ºPel -> imagens-1pel`
  - `2º Pel -> imagens-2pel`
  - `3º Pel -> imagens-3pel`
  - `Pel Ap -> imagens-pelap`
  - `Sec Cmdo -> imagens-seccmdo`
- Fluxo de URL:
  - tenta signed URL (bucket privado)
  - fallback para URL publica

## Controle de Acesso
- Baseado em `usuario_config` + RLS no Supabase.
- Usuario visualiza dados do proprio pelotao.
- `admin` visualiza geral.
- Perfil `consulta` pode ser configurado como somente leitura.

## Compatibilidade Preservada
- `organizacao`
- `indiceMilitares`
- `efetivoState`
- `renderTabs()`
- `renderCards()`
- `renderEfetivo()`
