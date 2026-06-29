import { useMemo, useState } from "react";
import GoalList from "./components/GoalList.jsx";
import GoalForm from "./components/GoalForm.jsx";
import TransactionForm from "./components/TransactionForm.jsx";
import ConfirmDialog from "./components/ConfirmDialog.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { calcularResumoGoal } from "./utils/calculations.js";
import { formatarMoeda, gerarId } from "./utils/format.js";
import "./styles/App.css";
import { useGoals } from "./hooks/useGoals";

import { useAuth } from "./context/AuthContext";
import AuthPage from "./auth/AuthPage";

const CHAVE_LOCAL_STORAGE = "goals-tracker:goals";

export default function App() {
  const { user, logout } = useAuth();

  const { goals, loading, createGoal, updateGoal, deleteGoal, addTransaction, deleteTransaction } = useGoals();

  const [modalGoal, setModalGoal] = useState({
    aberto: false,
    goal: null,
  });

  const [modalMovimento, setModalMovimento] = useState({
    aberto: false,
    goalId: null,
    tipo: "receita",
  });

  const [goalParaEliminar, setGoalParaEliminar] = useState(null);

  const resumoGeral = useMemo(() => {
    const saldoTotal = goals.reduce((soma, goal) => soma + calcularResumoGoal(goal).saldoAtual, 0);

    return {
      totalGoals: goals.length,
      saldoTotal,
    };
  }, [goals]);

  if (loading) {
    return <p>A carregar...</p>;
  }

  if (!user) {
    return <AuthPage />;
  }

  function abrirCriacaoDeGoal() {
    setModalGoal({ aberto: true, goal: null });
  }

  function abrirEdicaoDeGoal(goal) {
    setModalGoal({ aberto: true, goal });
  }

  function fecharModalGoal() {
    setModalGoal({ aberto: false, goal: null });
  }

  async function guardarGoal(dados) {
    if (modalGoal.goal) {
      await updateGoal(modalGoal.goal.id, {
        nome: dados.nome,
        descricao: dados.descricao,
        valorAlvo: dados.valorAlvo,
      });
    } else {
      await createGoal({
        nome: dados.nome,
        descricao: dados.descricao,
        valorAlvo: dados.valorAlvo,
        dataCriacao: new Date().toISOString(),
        transacoes: [],
      });
    }

    fecharModalGoal();
  }

  function pedirConfirmacaoEliminar(goal) {
    setGoalParaEliminar(goal);
  }

  async function confirmarEliminacaoGoal() {
    await deleteGoal(goalParaEliminar.id);
    setGoalParaEliminar(null);
  }

  function abrirAdicaoDeMovimento(goalId, tipo) {
    setModalMovimento({ aberto: true, goalId, tipo });
  }

  function fecharModalMovimento() {
    setModalMovimento((estado) => ({ ...estado, aberto: false }));
  }

  async function guardarMovimento(dados) {
    await addTransaction(modalMovimento.goalId, {
      tipo: modalMovimento.tipo,
      descricao: dados.descricao,
      valor: dados.valor,
      data: dados.data,
    });

    fecharModalMovimento();
  }

  async function eliminarMovimento(goalId, transacaoId) {
    await deleteTransaction(goalId, transacaoId);
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-texto">
          <span className="app__eyebrow">Caderneta de poupança</span>
          <h1 className="app__titulo">Goals Tracker</h1>
          <p className="app__subtitulo">
            Cria objetivos financeiros e acompanha o progresso através de receitas e despesas.
          </p>
        </div>

        <div className="app__header-acoes">
          {goals.length > 0 && (
            <div className="app__resumo">
              <span className="app__resumo-numero">{resumoGeral.totalGoals}</span>
              <span className="app__resumo-label">
                objetivo{resumoGeral.totalGoals !== 1 ? "s" : ""} · saldo total{" "}
                <strong>{formatarMoeda(resumoGeral.saldoTotal)}</strong>
              </span>
            </div>
          )}
          <button type="button" className="botao botao--primario" onClick={abrirCriacaoDeGoal}>
            + Novo objetivo
          </button>
          <button type="button" className="botao botao--secundario" onClick={logout}>
            🚪 Sair
          </button>
        </div>
      </header>

      <main className="app__conteudo">
        <GoalList
          goals={goals}
          onEditarGoal={abrirEdicaoDeGoal}
          onEliminarGoal={pedirConfirmacaoEliminar}
          onAdicionarMovimento={abrirAdicaoDeMovimento}
          onEliminarMovimento={eliminarMovimento}
          onCriarGoal={abrirCriacaoDeGoal}
        />
      </main>

      <GoalForm
        key={modalGoal.goal ? modalGoal.goal.id : "novo-goal"}
        aberto={modalGoal.aberto}
        goalInicial={modalGoal.goal}
        onSubmit={guardarGoal}
        onClose={fecharModalGoal}
      />

      <TransactionForm
        key={`${modalMovimento.goalId}-${modalMovimento.tipo}-${modalMovimento.aberto}`}
        aberto={modalMovimento.aberto}
        tipo={modalMovimento.tipo}
        onSubmit={guardarMovimento}
        onClose={fecharModalMovimento}
      />

      <ConfirmDialog
        aberto={Boolean(goalParaEliminar)}
        titulo="Eliminar objetivo?"
        onConfirmar={confirmarEliminacaoGoal}
        onCancelar={() => setGoalParaEliminar(null)}
      >
        Esta ação não pode ser desfeita. Vais perder também todos os movimentos associados ao objetivo{" "}
        <span className="confirmar__destaque">"{goalParaEliminar?.nome}"</span>.
      </ConfirmDialog>
    </div>
  );
}
