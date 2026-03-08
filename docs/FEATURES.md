# Funcionalidades Implementadas

## Login e Sessao
- Login por email/senha via Supabase Auth.
- Botao `Sair` com encerramento de sessao.
- Opcao de manter credenciais de email no dispositivo.
- Exigencia de clique em `Entrar` para acesso.

## Quadro Organizacional
- Carregamento via Supabase (`quadro_organizacional`).
- Abas por fracao e cards de militar.
- Busca por nome, funcao, posto/grad e numero.
- Dados do militar em modal.
- Botao de WhatsApp na ficha do militar, com abertura de conversa para `quadro_organizacional.celular`.

## Efetivo
- Persistencia no Supabase por militar e por data (`data_referencia`).
- Ao abrir o app, a data atual e consultada no Supabase para carregar o efetivo do dia.
- Ao trocar a data no app, o sistema consulta os registros daquela data (sem reset em massa).
- O Supabase so e atualizado quando o usuario altera um militar (em forma/situacao).
- Situacoes suportadas: `ferias`, `dispensado`, `missao`, `servico`, `s_sv (S Sv)`, `atrasado`, `outros`, `falta`, `baixado`.
- Cores na situacao:
  - Verde: em forma
  - Azul: ferias/dispensado/missao/servico/s_sv
  - Laranja: atrasado/outros
  - Vermelho: falta/baixado

## Controle por Pelotao
- Perfil do usuario em `usuario_config`.
- RLS no banco para filtrar por pelotao.
- Perfis de nivel de acesso (admin/comando/operador/consulta).

## Imagens
- Foto do militar por bucket de pelotao.
- Imagem do cabecalho por `usuario_config.imagem_cabecalho`.
- Resolucao por signed URL (privado) com fallback publico.

## TAF Dashboard
- Dashboard por ciclo (1º, 2º, 3º).
- Testes: barra, flexao, abdominal, corrida.
- Mencao final calculada pela menor mencao do ciclo.
- Atualizacao por modal com persistencia no Supabase.
- Inclusao de `pelotao` no payload de gravacao para compatibilidade com RLS.

## Fatos Observados (FO+/FO-)
- CRUD com persistencia no Supabase.
- Vinculo com militar por `id` (FK para quadro), com `id_fo` como identificador do registro.
- Leitura/escrita protegidas por RLS de pelotao.

## Historico/Obs
- CRUD com persistencia no Supabase.
- Vinculo com militar por `id` (FK para quadro), com `id_historico` como identificador do registro.

## Punicoes
- CRUD com persistencia no Supabase.
- Vinculo com militar por `id` (FK para quadro), com `id_punicao` como identificador do registro.
- Comportamento no modal de punicoes atualizado automaticamente pelas equivalencias:
  - `2 REP = 1 DET`
  - `2 DET = 1 PRISAO`
  - `2 PRISOES equivalentes = INSUFICIENTE`
  - `> 2 PRISOES equivalentes = MAU`

## TAT
- Leitura/edicao de mencao persistidas no Supabase.
- Vinculo com militar por `id` (FK para quadro), com `id_tat` como identificador do registro.

## Header por Usuario
- Subtitulo do cabecalho definido por `usuario_config.nome_pelotao`.
- Fallback para `usuario_config.pelotao` e, se vazio, `PELOPES`.

## API Layer
Acoes principais disponiveis:
- Auth: `login`, `logout`, `getSession`
- Usuario: `getUserConfig`
- Quadro: `getMilitares`, `getMilitarDados`, `addMilitar`, `updateMilitar`, `deleteMilitar`
- Efetivo: `getEfetivo`, `updateEfetivo`
- FO: `getFO`, `createFO`, `updateFO`, `deleteFO`
- Historico/Obs: `getHistoricoObs`, `createHistoricoObs`, `updateHistoricoObs`, `deleteHistoricoObs`
- Punicoes: `getPunicoes`, `createPunicao`, `updatePunicao`, `deletePunicao`
- TAF: `getTAF`, `getTAFDashboard`, `updateTAFDashboard`
- TAT: `getTAT`, `createTAT`, `updateTAT`
- Demais modulos mantidos no contrato atual da API.
