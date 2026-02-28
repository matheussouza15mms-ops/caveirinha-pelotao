# Modelo de Dados

## Militar

{
  pg: string,
  nomeGuerra: string,
  funcao: string,
  foto: string,
  numero?: number
}

## Grupo / Aba

{
  aba: string,
  militares: Militar[]
}

## Estado do Efetivo

cardId: "abaIndex-militarIndex"

efetivoState:
{
  emForma: boolean,
  situacao: string
}

## Situações Permitidas

- falta
- missao
- baixado
- ferias
- outros
- em_forma (interno)