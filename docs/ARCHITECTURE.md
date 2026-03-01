# Arquitetura do Sistema

## Padrão Arquitetural
Separação de responsabilidades sem framework:
- UI/Render: `app.js`
- Estado local de tela: `organizacao`, `indiceMilitares`, `efetivoState`
- Persistência/integração: `services/api.js`
- Mock de dados: `mock/db.json`

## Fluxo de Dados
1. `app.js` solicita dados via `CaveirinhaAPI`.
2. API layer lê/escreve no mock local quando `BASE_URL = "mock"`.
3. UI renderiza a partir do estado local (sem acessar JSON direto).

## Módulos de Negócio na UI
- Efetivo (KPIs + atualização + data global por coluna)
- FO+/FO- (listagem + criar + editar + excluir + copiar)
- Histórico/Obs (listagem + criar + editar + excluir)
- Dashboard TAF (1º/2º/3º, menções por teste e menção final)

## Compatibilidade Preservada
- `organizacao`
- `indiceMilitares`
- `efetivoState`
- `renderTabs()`
- `renderCards()`
- `renderEfetivo()`

## Portabilidade para Google Sheets
O contrato central é `apiRequest(action, payload)`.
A migração para Apps Script deve trocar apenas a origem remota em `services/api.js`, mantendo a UI intacta.
