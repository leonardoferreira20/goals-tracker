# Goals Tracker

Aplicação web em React para criar objetivos financeiros e acompanhar o
progresso de cada um através de receitas e despesas. Todos os dados são
guardados no **Local Storage** do navegador — nada é perdido ao atualizar
ou fechar a página, e não existe backend.

## Como executar localmente

Pré-requisito: [Node.js](https://nodejs.org) versão 18 ou superior.

```bash
npm install
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`.

Outros comandos disponíveis:

```bash
npm run build     # gera a versão de produção na pasta dist/
npm run preview   # pré-visualiza a versão de produção já compilada
```

## Funcionalidades

- Criar, editar e eliminar objetivos financeiros (nome, descrição opcional
  e valor alvo).
- Adicionar receitas e despesas a cada objetivo (descrição, valor e data).
- Cálculo automático, para cada objetivo, de:
  - Total de receitas
  - Total de despesas
  - Saldo atual (receitas − despesas)
  - Percentagem de progresso em relação ao valor alvo (limitada a 100%
    na barra visual)
- Confirmação antes de eliminar um objetivo.
- Persistência automática no Local Storage do navegador.
- Interface responsiva, com os objetivos apresentados em cartões
  centrados horizontalmente.

## Estrutura do projeto

```
src/
  components/
    GoalList.jsx          # grelha de cartões + estado vazio
    GoalCard.jsx           # cartão de um objetivo (stats, progresso, ações)
    GoalForm.jsx            # formulário criar/editar objetivo (modal)
    TransactionForm.jsx     # formulário adicionar receita/despesa (modal)
    ProgressBar.jsx         # barra de progresso animada
    Modal.jsx                # wrapper de modal genérico
    ConfirmDialog.jsx       # confirmação antes de eliminar
  hooks/
    useLocalStorage.js      # sincronização de estado com Local Storage
  utils/
    calculations.js         # cálculo de totais, saldo e progresso
    format.js                # formatação de moeda, datas e geração de id
  styles/                   # CSS puro, sem frameworks externos
  App.jsx
  main.jsx
```

## Modelo de dados (Local Storage)

Cada objetivo é guardado com esta forma:

```json
{
  "id": "uuid",
  "nome": "Comprar um carro",
  "descricao": "Carro usado, até 5 anos",
  "valorAlvo": 15000,
  "dataCriacao": "2026-06-01T10:00:00.000Z",
  "transacoes": [
    { "id": "uuid", "tipo": "receita", "descricao": "Poupança mensal", "valor": 500, "data": "2026-06-05" },
    { "id": "uuid", "tipo": "despesa", "descricao": "Levantamento", "valor": 50, "data": "2026-06-10" }
  ]
}
```

Fórmulas usadas:

```
Saldo Atual = Σ receitas − Σ despesas
Progresso (%) = (Saldo Atual / Valor Alvo) × 100   (limitado a [0, 100])
```
