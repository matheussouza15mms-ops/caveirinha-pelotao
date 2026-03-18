# Status Atual do Supabase

## Fonte de verdade local
Os arquivos SQL desta pasta passam a ser a referencia principal para o banco usado pelo app.

Arquivos ativos:
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

## O que foi feito nesta limpeza
- removidos CSVs de introspeccao do remoto
- removidos scripts auxiliares de introspeccao e precheck
- removidas migrations experimentais que nao serao aplicadas agora
- removidos artefatos temporarios do CLI em `.temp/`

## Situacao do remoto
- o Supabase remoto ja possui as tabelas principais usadas pelo app
- nao devemos reaplicar baseline estrutural no remoto sem necessidade
- futuras alteracoes devem ser cirurgicas e feitas por migration especifica

## Fluxo a partir de agora
1. Fazer a mudanca primeiro no codigo/SQL local.
2. Quando a mudanca envolver banco, criar ou ajustar o SQL correspondente em `supabase/`.
3. Se for alteracao nova no schema, criar uma migration nova em `supabase/migrations/`.
4. Revisar a migration antes de executar no remoto.
5. Aplicar no Supabase remoto via SQLTools.
6. Validar no app e manter o arquivo versionado.

## Regra pratica
- Nao criar migration de baseline novamente.
- Nao executar no remoto arquivos feitos apenas para documentacao local.
- Cada mudanca futura no banco deve ter um objetivo unico e claro.
