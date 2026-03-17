# Integracao Controle Sanitario: Google Sheets + Supabase

Este documento define como a planilha de controle sanitario sera integrada ao Supabase no Caveirinha App.

Objetivo:
- usar a planilha Google como interface operacional
- gravar e consultar os registros medicos no Supabase
- manter cada atendimento vinculado ao mesmo `id` da tabela `public.quadro_organizacional`
- respeitar o acesso por pelotao via RLS

## Escopo
- Origem operacional: Google Sheets + Google Apps Script
- Banco principal: Supabase
- Tabela destino: `public.controle_sanitario`
- Tabela de vinculo militar: `public.quadro_organizacional`
- Regra principal: nenhum registro de `controle_sanitario` deve existir sem vinculo com um militar valido em `quadro_organizacional`

## Arquitetura da Integracao
Fluxo esperado:
1. O usuario preenche ou edita um atendimento no app HTML do Google Apps Script.
2. O `Code.gs` recebe os dados do formulario.
3. O `Code.gs` identifica o militar correto no Supabase.
4. O `Code.gs` faz `insert`, `update`, `select` ou `delete` na tabela `public.controle_sanitario`.
5. O Supabase aplica as constraints e policies.
6. A interface do Apps Script exibe os dados retornados pelo banco.

Regra de arquitetura:
- A planilha nao deve ser a fonte primaria de verdade para os atendimentos.
- A tabela `public.controle_sanitario` passa a ser a fonte oficial.
- A aba `CONTROLE_SANITARIO` pode existir apenas como apoio, espelho ou auditoria, se desejado.

## Chaves e Seguranca
Nao salvar credenciais sensiveis direto no HTML.

Recomendado:
- `SUPABASE_URL` em `Script Properties`
- `SUPABASE_SERVICE_ROLE_KEY` em `Script Properties`

Motivo:
- o HTML do Apps Script roda no cliente
- qualquer chave embutida no front pode ser exposta
- a `service_role` deve ficar apenas no `Code.gs`

Configuracao recomendada em `Script Properties`:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SPREADSHEET_ID`

Observacao:
- a chave do Google e o client ID nao sao necessarios para ler e escrever na propria planilha quando o script esta vinculado a ela
- para o Supabase, a credencial importante e a chave do proprio Supabase

## Tabelas Envolvidas

### `public.quadro_organizacional`
Tabela mestre dos militares.

Campos relevantes para a integracao:
- `id`
- `pg`
- `numero`
- `nome_guerra`
- `nome_completo`
- `pelotao`

Uso na integracao:
- localizar o militar correto
- validar se ele existe
- obter o `id` oficial do militar
- garantir coerencia de pelotao para RLS e filtros

### `public.controle_sanitario`
Tabela destino dos atendimentos medicos.

Campos recomendados para a tabela:
- `id_controle_sanitario` `uuid` PK
- `id` `text not null`
- `sheet_row_id` `text not null`
- `origem_planilha` `text not null default 'google_sheets'`
- `data_referencia` `date`
- `data_visita` `date`
- `tipo_atendimento` `text`
- `local_atendimento` `text`
- `profissional_saude` `text`
- `cid` `text`
- `diagnostico` `text`
- `situacao` `text`
- `parecer` `text`
- `restricao` `text`
- `dispensado` `boolean not null default false`
- `baixado` `boolean not null default false`
- `internado` `boolean not null default false`
- `dias_afastamento` `integer`
- `data_inicio_afastamento` `date`
- `data_fim_afastamento` `date`
- `observacao` `text`
- `raw_payload` `jsonb not null default '{}'::jsonb`
- `created_at` `timestamptz`
- `updated_at` `timestamptz`

Regras obrigatorias:
- `id` deve ser `not null`
- `id` deve ser FK para `public.quadro_organizacional(id)`
- `sheet_row_id` deve ser unico

## Vinculo Obrigatorio com `quadro_organizacional`
Regra funcional:
- quando um militar aparecer no controle sanitario, ele deve ser exatamente o mesmo militar da `quadro_organizacional`

Regra tecnica:
- o Apps Script nunca deve gravar um atendimento apenas com nome solto
- antes de salvar, o script precisa encontrar o `id` oficial do militar

Ordem recomendada de tentativa para localizar o militar:
1. `numero`
2. `nome_guerra`
3. `nome_completo`

Se houver mais de um resultado:
- bloquear a gravacao
- retornar erro claro para o usuario

Se nao houver resultado:
- bloquear a gravacao
- orientar o cadastro ou correcao do militar na `quadro_organizacional`

## Mapeamento do Formulario para o Banco
Campos do formulario atual do Apps Script:
- `pg`
- `numero`
- `nomeGuerra`
- `nomeCompleto`
- `su`
- `pel`
- `data`
- `motivo`
- `prescricao`
- `situacao`
- `dataInicio`
- `tempo`
- `dataTermino`
- `obs`
- `atendidoPor`

Mapeamento recomendado:
- `data` -> `data_visita`
- `situacao` -> `situacao`
- `motivo` -> `diagnostico` ou `observacao`, conforme regra local
- `prescricao` -> `parecer` ou `restricao`, conforme regra local
- `dataInicio` -> `data_inicio_afastamento`
- `tempo` -> `dias_afastamento`
- `dataTermino` -> `data_fim_afastamento`
- `obs` -> `observacao`
- `atendidoPor` -> incluir dentro de `raw_payload` e, se desejado, criar coluna propria futura
- `pg`, `numero`, `nomeGuerra`, `nomeCompleto`, `su`, `pel` -> usados para localizar/validar o militar e tambem podem ser mantidos em `raw_payload`

Recomendacao importante:
- manter o payload original em `raw_payload`
- isso evita perda de informacao quando o formulario evoluir antes da tabela

## Campos que nao devem ser a chave do vinculo
Nao usar como chave primaria de associacao:
- `nome_guerra`
- `nome_completo`
- `pel`
- `su`

Motivo:
- esses dados podem mudar
- o vinculo permanente precisa ser o `id` do militar

## RLS e Acesso por Pelotao
Politica obrigatoria:
- o usuario so pode ler e alterar dados de militares do proprio pelotao

Implementacao esperada:
- as policies de `controle_sanitario` devem usar o mesmo padrao das outras tabelas do projeto
- a verificacao deve ser feita pelo `id` do militar, usando a funcao `public.caveirinha_can_access_militar(public.controle_sanitario.id)`

Policies esperadas:
- `select`
- `insert`
- `update`
- `delete`

Comportamento esperado:
- `admin` e `comando` podem ter acesso global, conforme `usuario_config`
- demais perfis veem apenas militares do proprio pelotao

## Operacoes que o Apps Script deve fazer

### 1. Listar militares
Objetivo:
- popular autocomplete e validacoes do formulario

Fonte:
- Supabase, lendo `public.quadro_organizacional`

Campos minimos:
- `id`
- `pg`
- `numero`
- `nome_guerra`
- `nome_completo`
- `pelotao`

### 2. Salvar atendimento
Fluxo:
1. receber payload do formulario
2. normalizar campos
3. localizar o militar no Supabase
4. obter `id`
5. montar objeto final para `public.controle_sanitario`
6. executar `insert` ou `upsert`

### 3. Listar atendimentos
Fonte:
- Supabase, nao a planilha

Filtros esperados:
- texto livre
- data inicial
- data final
- situacao

Ordenacao recomendada:
- `data_visita desc`

### 4. Editar atendimento
Fluxo:
- consultar registro pelo identificador do banco
- abrir no modal
- salvar por `id_controle_sanitario`

### 5. Excluir atendimento
Fluxo:
- excluir por `id_controle_sanitario`
- nunca excluir por numero de linha da planilha

## Identificadores no Apps Script
Situacao atual do codigo original:
- usa `rowNumber` da planilha

Problema:
- `rowNumber` deixa de ser confiavel quando o banco vira a fonte oficial

Novo padrao:
- usar `id_controle_sanitario` como identificador do registro
- usar `id` como identificador do militar
- usar `sheet_row_id` apenas para rastreio de origem e conciliacao

## Estrategia de Gravacao
Opcao recomendada:
- usar RPC ou `upsert` via REST no Supabase

Padrao minimo:
- se for registro novo: `insert`
- se for edicao: `update` por `id_controle_sanitario`

Opcao mais robusta:
- criar uma funcao RPC `upsert_controle_sanitario_google(...)`
- centralizar validacoes no banco

Beneficios:
- menos logica critica no Apps Script
- validacao padronizada
- menor risco de payload inconsistente

## Validacoes obrigatorias antes de salvar
- existe pelo menos um identificador do militar: `numero`, `nomeGuerra` ou `nomeCompleto`
- `data` preenchida
- militar encontrado unicamente em `quadro_organizacional`
- `id` valido antes da gravacao
- datas coerentes:
  - `data_inicio_afastamento <= data_fim_afastamento`
  - `dias_afastamento >= 1` quando houver afastamento

## Normalizacao recomendada
Aplicar no Apps Script antes de consultar:
- trim em todos os campos textuais
- comparacao sem acentos
- comparacao em lowercase
- datas sempre em `yyyy-MM-dd`

Campos booleanos derivados:
- `dispensado`
  - `true` quando a situacao representar dispensa
- `baixado`
  - `true` quando a situacao representar baixa
- `internado`
  - `true` quando houver regra especifica para internacao

## Fonte de Verdade
Definicao final:
- militares: `public.quadro_organizacional`
- atendimentos medicos: `public.controle_sanitario`
- planilha: interface operacional e, opcionalmente, espelho

## Estrutura recomendada do Apps Script

### `App.html`
Responsabilidades:
- interface
- coleta de dados
- listagem e filtros
- abertura de modal
- chamada de `google.script.run`

Nao deve:
- conter chave do Supabase
- conter regra sensivel de seguranca

### `Code.gs`
Responsabilidades:
- ler `Script Properties`
- consultar Supabase
- localizar militar
- converter payload
- gravar, listar, editar e excluir
- retornar dados para o `App.html`

## Funcoes recomendadas no `Code.gs`
- `getConfig()`
- `supabaseRequest(path, method, body)`
- `getMilitaresIndex()`
- `findMilitarId(payload)`
- `listAtendimentos(filters)`
- `saveAtendimento(payload)`
- `deleteAtendimento(idControleSanitario)`
- `normalizeDateStr(value)`
- `parseDateAny(value)`
- `norm(value)`

## Fluxo recomendado de `saveAtendimento(payload)`
1. Receber `payload`.
2. Normalizar datas e textos.
3. Chamar `findMilitarId(payload)`.
4. Se nao achar um unico militar, abortar com erro.
5. Montar objeto:
   - `id`
   - `sheet_row_id`
   - `data_visita`
   - `situacao`
   - `diagnostico`
   - `parecer`
   - `data_inicio_afastamento`
   - `dias_afastamento`
   - `data_fim_afastamento`
   - `observacao`
   - `raw_payload`
6. Fazer `insert` ou `update` no Supabase.
7. Retornar o registro salvo.

## Fluxo recomendado de `listAtendimentos(filters)`
1. Consultar `public.controle_sanitario`.
2. Trazer join logico com `quadro_organizacional` se necessario no proprio payload retornado.
3. Aplicar filtros por:
   - `data_visita`
   - `situacao`
   - `id`
   - texto livre nos campos textuais
4. Retornar a lista para o HTML.

## Erros que devem ser tratados
- militar nao encontrado
- militar duplicado para o criterio informado
- falha de autenticacao no Supabase
- policy bloqueando operacao
- payload sem data
- datas invalidas
- tentativa de editar registro inexistente

## Checklist de Implantacao
- tabela `public.controle_sanitario` criada
- FK de `controle_sanitario.id` para `quadro_organizacional.id`
- unique em `sheet_row_id`
- trigger de `updated_at`
- policies RLS criadas
- funcao `public.caveirinha_can_access_militar()` existente
- `Script Properties` configuradas com `SUPABASE_URL`
- `Script Properties` configuradas com `SUPABASE_SERVICE_ROLE_KEY`
- `App.html` sem segredo exposto
- `Code.gs` gravando e consultando no Supabase
- validacao de militar unico funcionando

## Recomendacao de Evolucao
Para reduzir falhas, o ideal e evoluir a tabela `controle_sanitario` com algumas colunas explicitas adicionais do formulario:
- `atendido_por`
- `motivo`
- `prescricao`
- `su`

Hoje esses dados podem ficar em `raw_payload`, mas tê-los como coluna melhora:
- filtro
- ordenacao
- relatorio
- auditoria

## Decisao final deste projeto
A integracao deve ser feita com este principio:
- o Google Apps Script e apenas a camada de entrada e consulta
- o Supabase e a fonte oficial
- o militar sempre e resolvido pelo `id` de `quadro_organizacional`
- o acesso sempre respeita o pelotao do usuario

## Observacao operacional
Se o Apps Script usar `service_role`, ele ignora RLS por definicao. Nesse caso, o proprio `Code.gs` deve validar pelotao antes de gravar ou consultar, ou entao a gravacao deve ser feita via RPC controlada no banco.

Opcao mais segura:
- expor uma RPC no Supabase para gravacao
- deixar o Apps Script chamar apenas a RPC
- manter a regra de negocio centralizada no banco
