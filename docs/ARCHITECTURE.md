# Arquitetura do Sistema

## Visão Geral
A arquitetura segue separação clara por responsabilidades:
- Dados: fornecidos pela API layer (`services/api.js`)
- Estado de UI: `organizacao`, `indiceMilitares`, `efetivoState`
- Renderização: `renderTabs()`, `renderCards()`, `renderEfetivo()`, `renderResultadosBusca()`
- Navegação: `setScreen()`

Sem framework, com controle manual de DOM.

## Fluxo de Dados Atual
1. `app.js` chama `CaveirinhaAPI.getMilitares()` e `CaveirinhaAPI.getEfetivo()`.
2. Os dados retornados são convertidos para a estrutura `organizacao` (compatibilidade legada).
3. `indiceMilitares` é reconstruído a partir de `organizacao`.
4. `efetivoState` é sincronizado com a coleção `efetivo` da API.
5. A UI renderiza apenas com base em estado local (sem acesso direto a persistência).

## Camada de API
Arquivo: `services/api.js`

### Contrato principal
`apiRequest(action, payload)`

### Modo atual
- `BASE_URL = "mock"`
- Leitura inicial de `mock/db.json`
- Operações CRUD em memória para simular backend

### Modo futuro
Trocar somente `BASE_URL` para o endpoint publicado do Google Apps Script:
`https://script.google.com/macros/s/XXXX/exec`

## Compatibilidade Preservada
Elementos mantidos por compatibilidade arquitetural:
- `organizacao`
- `indiceMilitares`
- `efetivoState`
- `renderTabs()`
- `renderCards()`
- `renderEfetivo()`

## Persistência
- UI não acessa `db.json` diretamente.
- UI não contém lógica de persistência.
- Persistência/sincronização passa exclusivamente pela API layer.
