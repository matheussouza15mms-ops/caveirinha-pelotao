# AI HANDOFF CONTEXT

Você está assumindo o desenvolvimento do Caveirinha App.

## Verdades absolutas
- `PROJECT_CONTEXT.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md`
- `FEATURES.md`
- `ROADMAP.md`

## Regras do projeto
1. Não remover funcionalidades existentes.
2. Não sugerir frameworks sem solicitação explícita.
3. Preservar compatibilidade com `organizacao`, `indiceMilitares`, `efetivoState` e padrão `render*`.
4. Qualquer mudança estrutural deve ter justificativa técnica.

## Estado atual importante
- Dados e persistência abstraídos em `services/api.js`.
- UI sem acesso direto a `mock/db.json`.
- FO e Histórico/Obs com CRUD via API layer.
- TAF com dashboard por ciclo e atualização de menções via API layer.

## Contrato de integração
- `apiRequest(action, payload)` é o ponto único.
- Ações de negócio já modeladas para futura implementação no Apps Script.

## Ao propor melhorias
Sempre explicitar:
- impacto
- risco
- compatibilidade
