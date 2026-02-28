# Arquitetura do Sistema

## Organização de Dados

O sistema utiliza um array principal:

const organizacao = [
  {
    aba: "NomeDaAba",
    militares: [
      { pg, nomeGuerra, funcao, foto, numero? }
    ]
  }
]

A partir dele é criado:

- indiceMilitares (flatMap)
- efetivoState (Map com estado individual)

## Estrutura de Renderização

- renderTabs()
- renderCards()
- renderEfetivo()
- renderResultadosBusca()

Toda renderização é baseada em:
- abaAtiva
- indiceMilitares
- efetivoState

## Controle de Estado

efetivoState:
Map<cardId, { emForma: boolean, situacao: string }>

Não existe persistência ainda.

## Padrão Arquitetural

- Separação por responsabilidades:
  - Dados (organizacao)
  - Estado (efetivoState)
  - Renderização (funções render*)
  - Navegação (setScreen)

- DOM controlado manualmente
- Nenhum framework