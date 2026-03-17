# Funcionalidades Implementadas

## Login e Sessao
- Login por email/senha via Supabase Auth.
- Botao `Sair` com encerramento de sessao.
- Opcao de manter credenciais de email no dispositivo.
- Exigencia de clique em `Entrar` para acesso.

## Quadro Organizacional
- Carregamento via Supabase (`quadro_organizacional`).
- Abas por fracao ou por pelotao, conforme nivel de acesso do usuario.
- Busca por nome, funcao, posto/grad e numero.
- Ficha do militar com acesso aos modulos administrativos.
- Botao de WhatsApp na ficha do militar, com abertura de conversa para `quadro_organizacional.celular`.

## Efetivo
- Persistencia no Supabase por militar e por data.
- Consulta da data atual ao abrir o app.
- Consulta por data sem reset em massa.
- Atualizacao pontual apenas quando o usuario altera um militar.
- Situacoes suportadas: `ferias`, `dispensado`, `missao`, `servico`, `s_sv`, `atrasado`, `outros`, `falta`, `baixado`.
- Cores na situacao:
  - Verde: em forma
  - Azul: ferias/dispensado/missao/servico/s_sv
  - Laranja: atrasado/outros
  - Vermelho: falta/baixado

## Controle Sanitario
- Leitura da tabela `public.controle_sanitario` via `services/controleSanitarioService.js`.
- Dashboard com cards de `Dispensados`, `Baixados` e `Internados`.
- Regras de contagem:
  - `Dispensado de atividade fisica` e `Outros` contam como `Dispensado`
  - demais situacoes diferentes de `Normalidade` contam como `Baixado`
  - registros com inicio/fim/dias preenchidos tambem entram na analise do dashboard
- Filtro por perfil:
  - `comando/admin` ve todos os pelotoes
  - demais usuarios veem apenas militares do proprio pelotao
- Tabela de militares fora da normalidade com destaque visual por proximidade do termino.
- Coluna `Pelotao` exibida para perfil `comando/admin`.
- Acao `Ficha Medica` por militar.

## Ficha Medica
- Popup com historico de atendimentos do militar.
- Exibe situacao atual com badge:
  - `Normalidade` em verde
  - `Dispensado`, `Baixado` e `Internado` em vermelho
- Tabela com data da visita, situacao, motivo, prescricao, inicio, termino, dias, atendido por e observacao.
- Layout responsivo com rolagem horizontal e vertical em mobile.

## Controle por Pelotao
- Perfil do usuario em `usuario_config`.
- RLS no banco para filtrar por pelotao.
- Perfis de nivel de acesso (`admin`, `comando`, `operador`, `consulta`).

## Imagens
- Foto do militar por bucket de pelotao.
- Imagem do cabecalho por `usuario_config.imagem_cabecalho`.
- Resolucao por signed URL (privado) com fallback publico.

## TAF Dashboard
- Dashboard por ciclo (1o, 2o, 3o).
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

## Configuracoes do App
- Tela dedicada de configuracoes integrada ao fluxo principal do app.
- Nome do usuario com edicao local.
- Foto de perfil local com troca por upload no navegador.
- Tema `light/dark`.
- Personalizacao de cor:
  - `Classic`
  - `Verde Oliva`
  - `Preto`
  - `Vermelho`
- Alteracao da cor do cabecalho e da barra do menu conforme personalizacao.
- Botao `Ligado/Desligado` para notificacoes.
- `Relatar um problema` com popup e envio para WhatsApp do desenvolvedor.
- Itens preparados para proxima fase:
  - Ajuda e suporte
  - Seguranca
  - Termos e politicas

## Header por Usuario
- Subtitulo do cabecalho definido por `usuario_config.nome_pelotao`.
- Fallback para `usuario_config.pelotao` e, se vazio, `PELOPES`.
- Saudacao dinamica por horario:
  - `Bom dia`
  - `Boa tarde`
  - `Boa noite`
- Nome exibido no cabecalho vem do nome configurado pelo usuario.

## API Layer
Acoes principais disponiveis:
- Auth: `login`, `logout`, `getSession`
- Usuario: `getUserConfig`
- Quadro: `getMilitares`, `getMilitarDados`, `addMilitar`, `updateMilitar`, `deleteMilitar`
- Efetivo: `getEfetivo`, `updateEfetivo`
- Controle Sanitario: `getControleSanitario`
- FO: `getFO`, `createFO`, `updateFO`, `deleteFO`
- Historico/Obs: `getHistoricoObs`, `createHistoricoObs`, `updateHistoricoObs`, `deleteHistoricoObs`
- Punicoes: `getPunicoes`, `createPunicao`, `updatePunicao`, `deletePunicao`
- TAF: `getTAF`, `getTAFDashboard`, `updateTAFDashboard`
- TAT: `getTAT`, `createTAT`, `updateTAT`

## Integracao Supabase + Google Sheets
- Script no Google Apps Script para:
  - sincronizar o efetivo do dia (`sincronizarEfetivoHoje`)
  - montar layout do mapa da forca (`montarMapaDaForca`)
  - gerar PDF (`gerarMapaDaForcaPDF`)
- Menu customizado na planilha: `Mapa da Forca`.
- Fluxo de atualizacao diario:
  - prepara base no Supabase por RPC (`seed_efetivo_dia`)
  - le `v_efetivo_hoje`
  - atualiza aba `EFETIVO_BASE`
  - renderiza aba `MAPA_FORCA`

## Automacao entre tabelas
- Atualizacoes em `quadro_organizacional` propagam para tabelas dependentes por trigger no banco.
- Propagacao por `id` apenas para colunas em comum.
- Evita manutencao manual de dados replicados.
