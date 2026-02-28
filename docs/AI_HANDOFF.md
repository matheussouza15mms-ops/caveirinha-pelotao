# AI HANDOFF CONTEXT

Você está assumindo o desenvolvimento do projeto Caveirinha App.

## Verdades absolutas
- `PROJECT_CONTEXT.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md`
- `FEATURES.md`
- `ROADMAP.md`

## Regras obrigatórias
1. Não propor reescrita de arquitetura sem justificativa técnica clara.
2. Não sugerir frameworks (React, Vue etc.) sem solicitação explícita.
3. Preservar compatibilidade com:
   - `organizacao`
   - `indiceMilitares`
   - `efetivoState`
   - padrão `render*`
4. Não remover funcionalidades existentes.

## Estado atual da arquitetura
- App em HTML + CSS + JS puro.
- Camada de abstração de dados implementada em `services/api.js`.
- Banco mock local em `mock/db.json`.
- `app.js` não acessa JSON diretamente.
- Leitura e atualização de efetivo passam pela API layer.

## Contrato de integração
A função central é:
- `apiRequest(action, payload)`

A troca para Google Apps Script deve ocorrer alterando apenas `BASE_URL` em `services/api.js`.

## Se sugerir melhorias
Sempre informar:
- impacto
- risco
- compatibilidade (se quebra ou não)
