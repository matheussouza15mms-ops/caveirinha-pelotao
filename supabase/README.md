# Supabase Local Workflow

Esta pasta guarda os SQLs ativos do projeto e serve como base de trabalho para futuras mudancas no banco.

## SQLs ativos
- `quadro_organizacional.sql`
- `efetivo.sql`
- `efetivo_sync_automatico.sql`
- `controle_sanitario.sql`
- `fatos_observados.sql`
- `historico_obs.sql`
- `punicoes.sql`
- `taf.sql`
- `tat.sql`
- `usuario_config_sync_auth.sql`
- `comando_crud_global.sql`

## Como vamos trabalhar daqui para frente
1. Alterar primeiro o SQL local.
2. Quando a mudanca for nova de schema, criar uma migration em `supabase/migrations/`.
3. Revisar a migration.
4. Aplicar no Supabase remoto via SQLTools.
5. Validar no app.

## Importante
- Nao usar migrations de baseline para o remoto.
- Nao manter CSVs/exportacoes temporarias nesta pasta.
- Mudancas futuras devem ser pequenas, especificas e versionadas.

Veja tambem:
- `STATUS_ATUAL.md`
