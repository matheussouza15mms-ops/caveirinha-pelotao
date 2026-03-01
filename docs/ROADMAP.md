# Roadmap de Evolução - Caveirinha App

## Objetivo Estratégico
Consolidar o app como plataforma administrativa conectada, com Google Sheets como base oficial de dados e sincronização bidirecional.

## Status Atual (2026-03-01)
Base de integração já operacional no frontend:
- API layer implementada (`apiRequest(action, payload)`)
- Mock local estruturado
- CRUD funcional para FO e Histórico/Obs
- Dashboard TAF funcional com regra de menção final

## Fase 1 - Integração com Google Sheets (em andamento)
### Já entregue
- Separação UI x persistência
- Contrato por ações (`action`)
- Estruturas de dados compatíveis para evolução

### Próximo passo técnico
- Implementar no Apps Script as ações já existentes no frontend:
  - FO (`get/create/update/delete`)
  - Histórico/Obs (`get/create/update/delete`)
  - TAF dashboard (`get/update`)
  - Efetivo (`get/update`)
  - Militares (`get`/`update dados`)

## Fases seguintes
- Punições (CRUD e status)
- TAT (registro e histórico)
- Ajustes de auditoria e controle de conflito (`lastUpdate`, `updatedBy`)

## Troca para produção
Troca central em `services/api.js`:
- de: `const BASE_URL = "mock"`
- para: URL do WebApp Google Apps Script

Sem necessidade de refatorar a interface.
