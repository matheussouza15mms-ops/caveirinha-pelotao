# AI HANDOFF CONTEXT

Voce esta assumindo o desenvolvimento do Caveirinha App.

## Verdades absolutas
- `PROJECT_CONTEXT.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md`
- `FEATURES.md`
- `ROADMAP.md`
- `SUPABASE_GOOGLE_SHEETS.md`
- `CONTROLE_SANITARIO_GOOGLE_SHEETS_SUPABASE.md`

## Regras do projeto
1. Nao remover funcionalidades existentes sem alinhamento.
2. Nao introduzir framework sem solicitacao explicita.
3. Preservar compatibilidade com `organizacao`, `indiceMilitares`, `efetivoState` e fluxo `render*`.
4. Toda mudanca estrutural deve ser documentada nos arquivos de `docs/`.

## Estado atual importante
- Auth real via Supabase (`services/auth.js`).
- Quadro, Efetivo, Controle Sanitario, FO, Historico/Obs, Punicoes, TAF e TAT funcionando no app.
- `usuario_config` ativo para comportamento por usuario.
- Controle Sanitario com dashboard, filtro por perfil/pelotao e Ficha Medica por militar.
- Configuracoes do app implementadas como tela propria.
- Nome configurado pelo usuario alimenta o cabecalho.
- Tema e esquema de cor sao locais no cliente.
- `Relatar um problema` abre popup e envia para WhatsApp do desenvolvedor.
- Fallback local em `dataService.js` mantido como contingencia.

## Contrato de integracao
- Ponto unico no frontend: `window.CaveirinhaAPI`.
- `services/api.js` roteia para Supabase quando disponivel, com fallback local quando necessario.

## Pendencias/observacoes
- Configuracoes ainda nao persistem no Supabase; hoje ficam em `localStorage`.
- Tela de Missoes segue placeholder.
- Itens de configuracao `Ajuda`, `Seguranca` e `Termos` ainda estao preparados como placeholders.

## Ao propor melhorias
Sempre explicitar:
- impacto
- risco
- compatibilidade
- necessidade de migracao de dados/policies
