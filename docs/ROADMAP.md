# Roadmap de Evolução - Caveirinha App

## Objetivo Estratégico
Transformar o Caveirinha App em uma plataforma administrativa conectada, com Google Sheets como base oficial e sincronização bidirecional.

## Status Geral (2026-02-28)
Fase 1 iniciada com base arquitetural pronta no frontend:
- API layer implementada (`services/api.js`)
- Função genérica `apiRequest(action, payload)` implementada
- Mock local em JSON implementado (`mock/db.json`)
- UI consumindo somente API layer para leitura e escrita de efetivo

## Fase 1 - Integração Google Sheets (Bidirecional)

### Já concluído
- Estrutura de coleções compatível com modelo do Sheets
- Separação entre interface e persistência
- Ponto único de troca para comunicação remota (`BASE_URL`)

### Pendente
- Publicação do backend Google Apps Script (WebApp)
- Implementação de ações remotas reais no Apps Script
- Sincronização bidirecional completa com controle de conflito

## Estrutura de Dados no Sheets (alvo)

### MILITARES
- id
- pg
- numero
- nomeGuerra
- funcao
- aba
- foto
- lastUpdate

### EFETIVO
- idMilitar
- emForma
- situacao
- dataAtualizacao

### FO
- id
- idMilitar
- data
- tipo
- descricao
- autor
- lastUpdate

### PUNICOES
- id
- idMilitar
- tipo
- enquadramento
- dataInicio
- dataFim
- status
- lastUpdate

### TAF
- id
- idMilitar
- data
- tipoTeste
- resultado
- observacao
- lastUpdate

### TAT
- id
- idMilitar
- data
- armamento
- pontuacao
- classificacao
- lastUpdate

## Próximas Fases

### Fase 2 - Tela FO
- CRUD completo
- Filtro por período
- Filtro por tipo

### Fase 3 - Tela Punições
- CRUD completo
- Status automático (ativa/cumprida)

### Fase 4 - Tela TAF
- Registro por data
- Histórico
- Indicadores de desempenho

### Fase 5 - Tela TAT
- Registro por sessão
- Classificação automática
- Histórico comparativo

### Fase 6 - Dark Mode
- Alternância por botão
- Persistência em `localStorage`
- Ajustes por CSS variables

## Troca futura para produção
Quando o Apps Script estiver pronto, trocar em `services/api.js`:
- de: `const BASE_URL = "mock"`
- para: `const BASE_URL = "https://script.google.com/macros/s/XXXX/exec"`

Sem alterar a lógica da interface.
