# Projeto: Caveirinha App

## Objetivo
Aplicação web para gestão do quadro organizacional, efetivo e ficha do militar, com arquitetura preparada para sincronização bidirecional futura com Google Sheets via Google Apps Script.

## Stack Atual
- HTML5
- CSS3
- JavaScript puro (Vanilla JS)
- Sem framework
- API layer local (`services/api.js`)

## Estrutura de Arquivos (estado atual)
- `index.html`
- `styles.css`
- `app.js`
- `services/api.js`
- `mock/db.json`
- `docs/`

## Telas/Módulos Ativos
1. Quadro Organizacional
2. Efetivo
3. Ficha do Militar
4. Dados do Militar (modal)
5. Fatos Observados FO+/FO- (CRUD)
6. Histórico/Obs (CRUD)
7. Dashboard TAF (1º, 2º e 3º)

## Estado Atual
- Navegação, busca, abas e cards funcionando
- Persistência da interface abstraída via API layer
- Mock local com coleções compatíveis com evolução para planilha
- FO, Histórico/Obs e TAF já operando com ações de API

## Fonte Oficial da Verdade
O estado oficial do projeto é sempre o último commit válido no Git.
