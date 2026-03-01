# Funcionalidades Implementadas

## Quadro Organizacional
- Abas verticais por fração
- Cards de militar com animação
- Correção visual para evitar card esticado quando há apenas 1 militar na aba

## Busca
- Busca lateral por posto/graduação, nome, função e número
- Navegação até o card encontrado com destaque

## Ficha do Militar
- Módulo Dados (modal com cópia por campo)
- Módulo Fatos Observados (FO+ / FO-) com CRUD completo e cópia do fato
- Módulo Histórico/Obs com CRUD completo
- Módulo TAF com mini dashboard visual por ciclo (1º/2º/3º)

## TAF Dashboard
- Testes por ciclo: barra, flexão, abdominal, corrida
- Menções: I, R, B, MB, E
- Regras visuais:
  - I e R em vermelho
  - B neutro
  - MB e E em verde
- Menção final calculada automaticamente como a menor menção do ciclo
- Atualização por modal de edição

## Efetivo
- Checkbox em forma + select situação
- KPIs em tempo real
- Controle de data global do efetivo (botão "Aplicar para todos")
- Coluna de data na tabela de efetivo usando `dataAtualizacao`
- Persistência via API layer

## API Layer (ações já disponíveis)
- Militares: `getMilitares`, `getMilitarDados`, `updateMilitarDados`
- Efetivo: `getEfetivo`, `updateEfetivo`
- FO: `getFO`, `createFO`, `updateFO`, `deleteFO`
- Histórico/Obs: `getHistoricoObs`, `createHistoricoObs`, `updateHistoricoObs`, `deleteHistoricoObs`
- TAF base: `getTAF`, `createTAF`, `updateTAF`
- TAF dashboard: `getTAFDashboard`, `updateTAFDashboard`
