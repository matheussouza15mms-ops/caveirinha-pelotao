# CSV Data Structure (Legado/Fallback)

## Objetivo
Documentar o formato CSV usado como fallback local durante a migracao para Supabase.

## Status
- Fonte principal atual: Supabase.
- CSV permanece como compatibilidade local em `services/dataService.js`.

## Arquivos CSV
- `data/quadro_organizacional.csv`
- `data/efetivo.csv`
- `data/fatos_observados.csv`
- `data/historico_obs.csv`
- `data/taf.csv`
- `data/tat.csv`
- `data/punicoes.csv`

## Observacoes Importantes
- O schema CSV pode divergir do schema final no Supabase (snake_case vs camelCase).
- Campos de relacao continuam baseados no id do militar.
- Novos desenvolvimentos devem priorizar tabela Supabase antes de alterar CSV.
