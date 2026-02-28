# Funcionalidades Implementadas

## Sidebar
- Toggle retrátil
- Ícones com `background-image`
- Modo colapsado esconde labels

## Quadro Organizacional
- Abas verticais
- Cards animados
- Animação escalonada
- Destaque visual para item encontrado

## Busca
- Painel flutuante lateral
- Filtro por:
  - Posto/Graduação
  - Nome
  - Função
  - Número (SD EV)
- Scroll automático até card

## Ficha do Militar
- Foto
- Nome completo formatado
- Função
- Botões de ação (estrutura pronta, sem lógica de negócio completa)

## Efetivo
- Checkbox = Em forma
- Select = Situação
- KPIs:
  - Total
  - Em forma
  - Destinos
  - Baixados
- Atualização dinâmica em tempo real
- Persistência via API layer (`updateEfetivo`)

## Integração de Dados (nova base)
- Inicialização dos militares via `getMilitares()`
- Inicialização do efetivo via `getEfetivo()`
- Camada de abstração criada em `services/api.js`
- Mock local criado em `mock/db.json`
- Interface sem acesso direto ao JSON
- Interface sem lógica de persistência direta

## Endpoints lógicos já expostos na API layer
- `getMilitares`
- `getEfetivo`
- `updateEfetivo`
- `getFO`, `createFO`, `updateFO`
- `getPunicoes`, `createPunicao`, `updatePunicao`
- `getTAF`, `createTAF`, `updateTAF`
- `getTAT`, `createTAT`, `updateTAT`
