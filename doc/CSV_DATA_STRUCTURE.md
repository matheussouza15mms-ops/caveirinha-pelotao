# CSV Data Structure

## Objetivo
Padronizar a camada de dados local em arquivos CSV para substituir a dependencia de `mock/db.json`, mantendo o contrato de integracao da API layer.

## Regras gerais
- Encoding: UTF-8
- Separador: virgula
- Primeira linha: cabecalho
- Chave relacional de militar: `id`

## Arquivos

### 1) `data/quadro_organizacional.csv`
Fonte principal de cadastro do militar.

Campos:
- `id`: chave primaria do militar
- `pg`, `numero`, `nomeGuerra`, `funcao`, `aba`, `foto`
- `lastUpdate`
- dados cadastrais: `nomeCompleto`, `dataNascimento`, `identidade`, `dataPraca`, `fracao`, `endereco`, `celular`, `nomePai`, `nomeMae`, `contatoEmergencia`, `comportamento`, `habilidade`

### 2) `data/efetivo.csv`
Estado de efetivo por militar.

Campos:
- `id`: referencia para `quadro_organizacional.id`
- `emForma`: `true` ou `false`
- `situacao`
- `dataAtualizacao`

### 3) `data/fatos_observados.csv`
Registros FO+ e FO-.

Campos:
- `foId`: identificador unico do registro FO
- `id`: referencia para `quadro_organizacional.id`
- `data`, `tipo`, `descricao`, `autor`, `lastUpdate`

### 4) `data/historico_obs.csv`
Historico e observacoes por militar.

Campos:
- `historicoId`: identificador unico do registro
- `id`: referencia para `quadro_organizacional.id`
- `texto`, `autor`, `data`, `lastUpdate`

### 5) `data/taf.csv`
Base de resultados de TAF por teste.

Campos:
- `tafId`: identificador unico do registro TAF
- `id`: referencia para `quadro_organizacional.id`
- `data`, `tipoTeste`, `resultado`, `observacao`, `lastUpdate`

### 6) `data/tat.csv`
Base de resultados de TAT.

Campos:
- `tatId`: identificador unico do registro TAT
- `id`: referencia para `quadro_organizacional.id`
- `data`, `armamento`, `pontuacao`, `classificacao`, `lastUpdate`

## Relacionamento entre arquivos
Relacao principal (1:N a partir de militar):
- `quadro_organizacional.id` 1:N `fatos_observados.id`
- `quadro_organizacional.id` 1:N `historico_obs.id`
- `quadro_organizacional.id` 1:N `taf.id`
- `quadro_organizacional.id` 1:N `tat.id`
- `quadro_organizacional.id` 1:1 (ou 1:N historico) `efetivo.id`

## Compatibilidade com frontend
A UI continua usando `window.CaveirinhaAPI`.
A camada `services/dataService.js` faz o mapeamento entre:
- `id` (relacional nos CSV)
- `idMilitar` (contrato de payload usado no frontend)

Assim, a interface, navegacao e componentes visuais permanecem inalterados.
