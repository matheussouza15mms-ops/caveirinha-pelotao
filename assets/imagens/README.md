Armazene as fotos dos militares nesta pasta.

Padrao recomendado:
- Nome do arquivo igual ao `id` do militar no CSV.
- Extensao preferencial: `.jpg`.

Exemplos:
- `assets/imagens/mil-001.jpg`
- `assets/imagens/mil-002.jpg`

Compatibilidade da aplicacao:
- Se `foto` no CSV estiver vazio, sera usado `assets/imagens/<id>.jpg`.
- Se `foto` no CSV tiver apenas nome de arquivo (ex.: `mil-010.png`), sera usado `assets/imagens/mil-010.png`.
