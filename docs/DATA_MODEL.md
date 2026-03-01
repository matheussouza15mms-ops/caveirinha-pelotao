# Modelo de Dados

## Coleções Atuais no Mock (`mock/db.json`)
- `militares`
- `efetivo`
- `fo`
- `historicoObs`
- `punicoes`
- `taf`
- `tat`

## Militar
Campos relevantes:
- `id`, `pg`, `numero`, `nomeGuerra`, `funcao`, `aba`, `foto`, `lastUpdate`
- dados pessoais: `nomeCompleto`, `dataNascimento`, `identidade`, `dataPraca`, `fracao`, `endereco`, `celular`, `nomePai`, `nomeMae`, `contatoEmergencia`, `comportamento`, `habilidade`

## Efetivo
- `idMilitar`
- `emForma`
- `situacao`
- `dataAtualizacao` (data de referência do efetivo, com suporte a atualização global na UI)

## FO
- `id`
- `idMilitar`
- `data`
- `tipo` (`FO+` ou `FO-`)
- `descricao`
- `autor`
- `lastUpdate`

## Histórico/Obs
- `id`
- `idMilitar`
- `texto`
- `autor`
- `data`
- `lastUpdate`

## TAF (persistência base)
- `id`
- `idMilitar`
- `data`
- `tipoTeste` (padrão atual: `1TAF_barra`, `2TAF_corrida`, etc.)
- `resultado` (I, R, B, MB, E)
- `observacao`
- `lastUpdate`

## Dashboard TAF (visão derivada)
- Ciclos: 1º, 2º e 3º
- Testes: barra, flexão, abdominal, corrida
- Menção final: menor menção entre os quatro testes do ciclo
