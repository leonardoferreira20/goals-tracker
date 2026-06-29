import GoalCard from "./GoalCard.jsx";
import "../styles/GoalList.css";

/**
 * Grelha de objetivos, centrada horizontalmente. Mostra um estado vazio
 * com convite à ação quando ainda não existem objetivos criados.
 */
export default function GoalList({
  goals,
  onEditarGoal,
  onEliminarGoal,
  onAdicionarMovimento,
  onEliminarMovimento,
  onCriarGoal,
}) {
  if (goals.length === 0) {
    return (
      <div className="goal-list__vazio">
        <span className="goal-list__vazio-icone" aria-hidden="true">
          ⛁
        </span>
        <h2 className="goal-list__vazio-titulo">Ainda sem objetivos</h2>
        <p className="goal-list__vazio-texto">
          Cria o teu primeiro objetivo financeiro e começa a registar receitas e despesas para acompanhar o progresso.
        </p>
        <button type="button" className="botao botao--primario" onClick={onCriarGoal}>
          + Criar objetivo
        </button>
      </div>
    );
  }

  return (
    <div className="goal-list">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onEditar={onEditarGoal}
          onEliminar={onEliminarGoal}
          onAdicionarMovimento={onAdicionarMovimento}
          onEliminarMovimento={onEliminarMovimento}
        />
      ))}
      <button type="button" className="goal-list__novo-cartao" onClick={onCriarGoal}>
        <span className="goal-list__novo-icone">+</span>
        <span>Novo objetivo</span>
      </button>
    </div>
  );
}
