# Roadmap de Evolução — Caveirinha App

## Objetivo Estratégico

Transformar o Caveirinha App em uma plataforma administrativa conectada,
com Google Sheets funcionando como banco de dados oficial e sincronização bidirecional.

---

# 🔷 Fase 1 — Integração Google Sheets (Bidirecional)

## Objetivo
Permitir:

- Ler dados do Sheets ao iniciar o app
- Atualizar Sheets ao alterar dados no app
- Sincronização consistente entre interface e banco
- Controle de conflitos

---

## Estrutura de Dados Recomendada no Sheets

### Aba: MILITARES
- id
- pg
- numero
- nomeGuerra
- funcao
- aba
- foto

### Aba: EFETIVO
- idMilitar
- emForma
- situacao
- dataAtualizacao

### Aba: TAF
- idMilitar
- data
- tipo
- resultado
- observacao

### Aba: TAT
- idMilitar
- data
- armamento
- pontuacao
- classificacao

### Aba: FO
- idMilitar
- data
- tipo
- descricao
- autor

### Aba: PUNICOES
- idMilitar
- tipo
- enquadramento
- dataInicio
- dataFim
- status

---

## Arquitetura Técnica

Frontend:
HTML + CSS + JS (atual)

Backend:
Google Apps Script publicado como WebApp

Comunicação:
fetch() com JSON

Modelo:
- GET → Carrega dados
- POST → Atualiza registros
- PUT → Atualização específica
- DELETE → Remoção

---

## Controle de Conflitos

Estratégia sugerida:

- Cada registro terá:
  - lastUpdateTimestamp
  - updatedBy

Regra:
Se timestamp remoto > local → atualizar local
Se local > remoto → enviar atualização

---

# 🔷 Fase 2 — Tela FO

- CRUD completo
- Filtro por período
- Filtro por tipo
- Exportação futura PDF

---

# 🔷 Fase 3 — Tela Punições

- CRUD completo
- Status automático (ativa / cumprida)
- Integração com relatório disciplinar

---

# 🔷 Fase 4 — Tela TAF

- Registro por data
- Histórico
- Cálculo automático de média
- Indicador visual de aptidão

---

# 🔷 Fase 5 — Tela TAT

- Registro por sessão
- Classificação automática
- Histórico comparativo

---

# 🔷 Fase 6 — Dark Mode

- Alternância via botão
- Persistência localStorage
- CSS variables
- Transição suave

---

# Ordem Recomendada

1️⃣ Estrutura base Google Sheets  
2️⃣ Backend Apps Script  
3️⃣ Integração Efetivo  
4️⃣ FO  
5️⃣ Punições  
6️⃣ TAF  
7️⃣ TAT  
8️⃣ Dark Mode  

---

# Visão Final

Sistema administrativo completo, online, sincronizado, estruturado,
com possibilidade futura de:

- Controle de acesso
- Login por usuário
- Auditoria de alterações
- Geração de relatórios oficiais