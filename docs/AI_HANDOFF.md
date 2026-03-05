# AI HANDOFF CONTEXT

Voce esta assumindo o desenvolvimento do Caveirinha App.

## Verdades absolutas
- `PROJECT_CONTEXT.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md`
- `FEATURES.md`
- `ROADMAP.md`

## Regras do projeto
1. Nao remover funcionalidades existentes sem alinhamento.
2. Nao introduzir framework sem solicitacao explicita.
3. Preservar compatibilidade com `organizacao`, `indiceMilitares`, `efetivoState` e fluxo `render*`.
4. Toda mudanca estrutural deve ser documentada nos arquivos de `docs/`.

## Estado atual importante
- Auth real via Supabase (`services/auth.js`).
- Quadro, Efetivo, FO, Historico/Obs, Punicoes, TAF e TAT operando no Supabase.
- `usuario_config` ativo para comportamento por usuario.
- Imagens por buckets de pelotao.
- Subtitulo do cabecalho sincronizado por usuario via `usuario_config.nome_pelotao`.
- Fallback local em `dataService.js` mantido como contingencia.

## Contrato de integracao
- Ponto unico no frontend: `window.CaveirinhaAPI`.
- `services/api.js` roteia para Supabase quando disponivel, com fallback local quando necessario.

## Ao propor melhorias
Sempre explicitar:
- impacto
- risco
- compatibilidade
- necessidade de migracao de dados/policies
