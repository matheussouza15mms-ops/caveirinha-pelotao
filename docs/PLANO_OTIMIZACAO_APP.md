# Plano de Otimizacao do App

Plano para deixar o Caveirinha App o mais leve possivel sem perder funcionalidades, seguranca, integracao com Supabase e identidade visual.

## Objetivos

- Reduzir tempo de carregamento inicial.
- Melhorar estabilidade com varios usuarios simultaneos.
- Diminuir volume de consultas e trafego entre frontend e Supabase.
- Preservar seguranca via Auth, RLS e controle por pelotao.
- Manter a identidade visual, organizacao das telas e experiencia operacional.

## Principios

- Carregar primeiro o que e essencial para a tela atual.
- Buscar detalhes sob demanda.
- Evitar consultas repetidas, pesadas ou redundantes.
- Atualizar apenas a parte da interface que realmente mudou.
- Preservar o mesmo comportamento funcional para o usuario final.

## Diagnostico Atual

Pontos que mais pesam hoje:

- carregamento inicial ainda depende de varias leituras seguidas;
- consultas ainda trazem mais colunas do que o necessario em algumas telas;
- existe recarregamento amplo em eventos de sincronizacao;
- fotos e detalhes individuais podem aumentar bastante o custo de entrada;
- o app usa muitas tabelas e regras RLS, o que aumenta o custo de cada consulta.

## Metas de Performance

- abrir o app e mostrar a tela principal rapidamente;
- suportar varios usuarios simultaneos sem travamento perceptivel;
- reduzir o tempo de login e pos-login;
- evitar tela em branco durante sincronizacao;
- reduzir re-renderizacao completa das telas.

## Progresso Executado

Ja concluido:

- login manual obrigatorio, sem entrada automatica ao abrir o app;
- remocao da foto dos cards do quadro organizacional;
- foto real carregada apenas ao abrir a ficha do militar;
- cache local do detalhe do militar para reduzir leituras repetidas da ficha;
- consulta inicial do quadro reduzida para colunas minimas;
- cards do quadro reorganizados para layout mais compacto;
- realtime separado para reduzir recarregamento total em mudancas de `efetivo`.
- cache local por sessao para `usuario_config`, `quadro` resumido e `efetivo` por data.
- debounce e indice de busca pre-processado para reduzir trabalho a cada digitacao.
- cache curto para URLs de imagens no Storage.
- remocao de verificacoes `HEAD` desnecessarias no fluxo de imagens.
- filtros por `idMilitar` em telas secundarias para evitar leitura de colecoes inteiras no Supabase.
- dashboard TAF e ficha medica do controle sanitario ajustados para leitura direcionada por militar quando aplicavel.
- indices compostos locais e migration incremental para filtros reais por `id`, `tipo`, `data` e `pelotao`.
- migration incremental preparada para consolidar helpers de RLS e reduzir repeticao de subqueries por pelotao.

Em andamento:

- reduzir ainda mais o custo do realtime em mudancas de `quadro_organizacional`;
- medir gargalos por tela.
- revisar invalidacao de cache por tipo de evento.
- revisar interacoes do Supabase em telas secundarias que ainda carregam colecoes inteiras.

## Frente 1: Otimizacao do Frontend

### 1.1 Carregamento progressivo

- carregar apenas sessao, usuario_config, quadro resumido e efetivo do dia na entrada;
- adiar modulos secundarios para quando o usuario abrir a tela correspondente;
- mostrar a interface principal antes de terminar carregamentos nao criticos.

### 1.2 Renderizacao mais leve

- atualizar apenas o card, linha ou tabela afetada;
- evitar reconstruir toda a organizacao quando apenas o efetivo mudar;
- reduzir render completo de tabs e cards quando houver mudanca pequena;
- manter skeleton ou placeholder enquanto a atualizacao estiver em andamento.

### 1.3 Cache local por sessao

- cachear `usuario_config`;
- cachear `quadro_organizacional` resumido;
- cachear `efetivo` por data;
- invalidar cache apenas quando houver mudanca real ou logout.

### 1.4 Fotos e assets

- manter fotos fora do quadro organizacional;
- carregar foto real apenas na ficha do militar;
- reduzir numero de imagens carregadas por tela;
- reaproveitar URL de imagem em cache por curto periodo;
- evitar verificacoes extras como `HEAD` quando nao forem essenciais.

### 1.5 Busca e interacoes

- aplicar debounce em pesquisa;
- evitar consultas automáticas desnecessarias a cada acao pequena;
- fazer atualizacao otimista quando seguro, principalmente no efetivo.

## Frente 2: Otimizacao do Supabase

### 2.1 Consultas enxutas

- substituir `select(*)` por colunas minimas;
- criar selects especificos por tela;
- usar views para leitura pronta onde fizer sentido;
- usar RPC apenas para operacoes que realmente precisam de logica no banco.

### 2.2 Indices

Criar ou revisar indices para:

- `quadro_organizacional.id`
- `quadro_organizacional.pelotao`
- `efetivo.id`
- `efetivo.data_referencia`
- `usuario_config.user_id`
- `usuario_config.pelotao`
- `usuario_config.nivel_acesso`

### 2.3 Realtime

- nao recarregar o app inteiro a cada evento;
- separar evento de `efetivo` de evento de `quadro_organizacional`;
- atualizar somente a tela afetada;
- reduzir assinaturas desnecessarias.

### 2.4 RLS e seguranca

- manter RLS em todas as tabelas sensiveis;
- simplificar policies para reduzir custo computacional;
- evitar subqueries duplicadas nas policies;
- padronizar comparacao de pelotao para evitar mismatch.

## Frente 3: Estrategia de Dados

### 3.1 Separar dado resumido e dado completo

Para lista:

- `id`
- `pg`
- `numero`
- `nome_guerra`
- `funcao`
- `fracao`
- `pelotao`
- `celular`
- `updated_at`

Para ficha:

- todos os dados completos do militar;
- foto real;
- dados administrativos completos.

### 3.2 Efetivo

- manter sincronizacao por `id`;
- carregar somente a data selecionada;
- atualizar somente a linha alterada quando possivel;
- evitar recarregamento total do quadro ao mudar apenas o efetivo;
- considerar batch de atualizacoes quando houver multiplas alteracoes seguidas.

### 3.3 usuario_config

- sincronizar automaticamente a partir de `auth.users`;
- manter `pelotao`, `nivel_acesso` e `ativo` consistentes;
- evitar bloquear o app por ausencia de campos secundarios.

## Frente 4: UX e Experiencia

- manter o visual militar/operacional do app;
- preservar cards compactos e legiveis;
- manter a ficha como area de detalhe rica;
- mostrar feedback visual claro durante login, sincronizacao e erro;
- reduzir a sensacao de travamento com carregamento progressivo.

## Frente 5: Seguranca

- nao abrir mao de Auth real no Supabase;
- manter RLS por pelotao e por nivel de acesso;
- manter controle de `admin`, `comando` e `operador`;
- evitar expor dados completos em consultas de lista;
- usar RPC com `security definer` apenas onde necessario e bem controlado.

## Ordem Recomendada de Implementacao

### Etapa 1: Ganhos imediatos

- [x] remover fotos do quadro organizacional;
- [x] carregar foto so na ficha;
- [x] reduzir `select(*)` da listagem inicial;
- [x] exigir login manual sem autoentrada;
- [x] diminuir re-render desnecessario no login.

### Etapa 2: Ganhos grandes

- [x] otimizar realtime para nao recarregar tudo em mudancas de `efetivo`;
- [x] cachear `quadro` e `efetivo` por sessao;
- [x] reduzir custo da busca local com debounce e indice pre-processado;
- [x] reduzir repeticao de leituras de detalhe e URLs de imagem;
- [ ] separar melhor o carregamento inicial do carregamento secundario;
- [ ] criar views/RPCs enxutas para telas pesadas.

### Etapa 3: Ganhos estruturais

- revisar e simplificar policies RLS;
- revisar indices;
- aplicar indices compostos alinhados aos filtros mais usados do app;
- medir tempos reais de consulta;
- criar estrategia de invalidacao de cache;
- aplicar atualizacao parcial de componentes.

### Etapa 4: Refinos finais

- skeleton loading;
- paginação ou virtualizacao se necessario;
- compressao de assets;
- monitoramento continuo de uso e gargalos.

## Checklist Tecnico

- [x] reduzir consultas principais de lista para colunas minimas
- [ ] revisar RPCs e triggers do efetivo
- [x] separar atualizacao de `efetivo` e `quadro`
- [x] revisar custo inicial do realtime
- [ ] padronizar comparacao de pelotao
- [x] revisar indices no Supabase
- [ ] revisar RLS com foco em performance
- [x] adicionar cache local por sessao
- [x] reduzir chamadas repetidas ao Storage e detalhes individuais
- [ ] adicionar indicadores de carregamento
- [ ] medir gargalos por tela

## Riscos a Evitar

- otimizar demais e quebrar RLS;
- reduzir payload e esquecer campos usados em outra tela;
- usar cache sem invalidacao correta;
- perder a consistencia visual do app;
- recarregar menos, mas deixar dado desatualizado sem sinalizar ao usuario.

## Resultado Esperado

Ao final da otimizacao, o app deve:

- abrir mais rapido;
- suportar mais usuarios simultaneos com estabilidade;
- consultar menos dados por tela;
- manter sincronizacao com Supabase;
- preservar seguranca, estilo e funcionalidades operacionais.
