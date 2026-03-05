# Modelo de Dados

## Fonte de Dados Atual
- Principal: Supabase (Postgres + RLS + Storage)
- Secundaria/fallback: CSV local via `services/dataService.js`

## Tabelas Principais no Supabase

### `public.quadro_organizacional`
Campos usados pelo app:
- `id` (PK)
- `pg`, `numero`, `nome_guerra`, `funcao`, `fracao`
- `foto`
- `nome_completo`, `data_nascimento`, `identidade`, `data_praca`
- `endereco`, `celular`, `nome_pai`, `nome_mae`, `contato_emergencia`
- `comportamento`, `habilidade`
- `pelotao`
- `created_at`, `updated_at`

### `public.taf`
Variantes encontradas no ambiente:
- Variante A: `id` (registro), `id_militar` (FK para quadro)
- Variante B: `taf_id` (registro), `id` (militar)

Campos de negocio:
- militar
- `data`
- `tipo_teste` (`1TAF_barra`, etc.)
- `resultado` (`I`, `R`, `B`, `MB`, `E`)
- `observacao`
- `pelotao`

### `public.usuario_config`
- `user_id` (FK para `auth.users.id`)
- `nome_usuario`
- `imagem_cabecalho`
- `tema`
- `pelotao`
- `nivel_acesso`
- `ativo`
- `created_at`, `updated_at`

## Storage
Buckets por pelotao:
- `imagens-1pel`
- `imagens-2pel`
- `imagens-3pel`
- `imagens-pelap`
- `imagens-seccmdo`

## Convencoes de Imagem
- `quadro_organizacional.foto`: path do arquivo no bucket do pelotao (ex.: `mil-001.png`)
- `usuario_config.imagem_cabecalho`: path do logo do cabecalho no bucket do pelotao (ex.: `logo.png`)

## RLS
- Filtro por pelotao para acesso de leitura/escrita.
- `admin` pode ser configurado para visao ampla.
- Perfil `consulta` pode ser restrito para somente leitura.
