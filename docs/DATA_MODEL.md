# Modelo de Dados

## Modelo Operacional Atual (UI)

### Militar (na UI)
```js
{
  id: string,
  pg: string,
  numero: number | null,
  nomeGuerra: string,
  funcao: string,
  foto: string,
  aba: string,
  lastUpdate: string
}
```

### Grupo / Aba (compatibilidade legada)
```js
{
  aba: string,
  militares: Militar[]
}
```

### Estado do Efetivo (UI)
- Chave: `cardId` no formato `"abaIndex-militarIndex"`
- Estrutura:
```js
{
  emForma: boolean,
  situacao: string
}
```

### Situações Permitidas
- `falta`
- `missao`
- `baixado`
- `ferias`
- `outros`
- `em_forma` (interno quando checkbox está marcado)

## Modelo Alvo (Google Sheets / Apps Script)

### MILITARES
- `id`
- `pg`
- `numero`
- `nomeGuerra`
- `funcao`
- `aba`
- `foto`
- `lastUpdate`

### EFETIVO
- `idMilitar`
- `emForma`
- `situacao`
- `dataAtualizacao`

### FO
- `id`
- `idMilitar`
- `data`
- `tipo`
- `descricao`
- `autor`
- `lastUpdate`

### PUNICOES
- `id`
- `idMilitar`
- `tipo`
- `enquadramento`
- `dataInicio`
- `dataFim`
- `status`
- `lastUpdate`

### TAF
- `id`
- `idMilitar`
- `data`
- `tipoTeste`
- `resultado`
- `observacao`
- `lastUpdate`

### TAT
- `id`
- `idMilitar`
- `data`
- `armamento`
- `pontuacao`
- `classificacao`
- `lastUpdate`

## Mock Local Atual
Arquivo: `mock/db.json`

Estrutura base:
```json
{
  "militares": [],
  "efetivo": [],
  "fo": [],
  "punicoes": [],
  "taf": [],
  "tat": []
}
```
