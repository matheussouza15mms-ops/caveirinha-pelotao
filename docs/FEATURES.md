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

## Modulos CRUD (hibrido)
- FO, Historico/Obs, Punicoes e partes do Efetivo ainda podem operar via fallback local, dependendo do ambiente.

## API Layer
Acoes principais disponiveis:
- Auth: `login`, `logout`, `getSession`
- Usuario: `getUserConfig`
- Quadro: `getMilitares`, `getMilitarDados`, `addMilitar`, `updateMilitar`, `deleteMilitar`
- TAF: `getTAF`, `getTAFDashboard`, `updateTAFDashboard`
- Demais modulos mantidos no contrato atual da API.
