import { useState } from 'react'
import ProgressBar from './ProgressBar.jsx'
import { calcularResumoGoal } from '../utils/calculations.js'
import { formatarMoeda, formatarData } from '../utils/format.js'
import '../styles/GoalCard.css'

/**
 * Cartão de um objetivo financeiro: mostra o progresso, os totais
 * (receitas, despesas, saldo) e dá acesso às ações de gestão
 * (editar, eliminar, adicionar receita/despesa, ver movimentos).
 */
export default function GoalCard({ goal, onEditar, onEliminar, onAdicionarMovimento, onEliminarMovimento }) {
  const [mostrarMovimentos, setMostrarMovimentos] = useState(false)

  const { totalReceitas, totalDespesas, saldoAtual, progresso, concluido } =
    calcularResumoGoal(goal)

  const movimentosOrdenados = [...goal.transacoes].sort(
    (a, b) => new Date(b.data) - new Date(a.data)
  )

  return (
    <article className="goal-card">
      <header className="goal-card__cabecalho">
        <div className="goal-card__titulo-bloco">
          <h3 className="goal-card__nome">{goal.nome}</h3>
          {goal.descricao && <p className="goal-card__descricao">{goal.descricao}</p>}
        </div>

        <div className="goal-card__acoes-topo">
          <button
            type="button"
            className="goal-card__icon-botao"
            onClick={() => onEditar(goal)}
            aria-label="Editar objetivo"
            title="Editar objetivo"
          >
            ✎
          </button>
          <button
            type="button"
            className="goal-card__icon-botao goal-card__icon-botao--perigo"
            onClick={() => onEliminar(goal)}
            aria-label="Eliminar objetivo"
            title="Eliminar objetivo"
          >
            🗑
          </button>
        </div>
      </header>

      {concluido && <span className="goal-card__selo-completo">Objetivo alcançado</span>}

      <ProgressBar valor={progresso} concluido={concluido} />

      <dl className="goal-card__stats">
        <div className="goal-card__stat">
          <dt>Valor alvo</dt>
          <dd>{formatarMoeda(goal.valorAlvo)}</dd>
        </div>
        <div className="goal-card__stat">
          <dt>Saldo atual</dt>
          <dd className={saldoAtual < 0 ? 'goal-card__valor--negativo' : ''}>
            {formatarMoeda(saldoAtual)}
          </dd>
        </div>
        <div className="goal-card__stat">
          <dt>Receitas</dt>
          <dd className="goal-card__valor--receita">+{formatarMoeda(totalReceitas)}</dd>
        </div>
        <div className="goal-card__stat">
          <dt>Despesas</dt>
          <dd className="goal-card__valor--despesa">-{formatarMoeda(totalDespesas)}</dd>
        </div>
      </dl>

      <div className="goal-card__acoes-movimento">
        <button
          type="button"
          className="botao botao--receita"
          onClick={() => onAdicionarMovimento(goal.id, 'receita')}
        >
          + Receita
        </button>
        <button
          type="button"
          className="botao botao--despesa"
          onClick={() => onAdicionarMovimento(goal.id, 'despesa')}
        >
          + Despesa
        </button>
      </div>

      <button
        type="button"
        className="goal-card__toggle-movimentos"
        onClick={() => setMostrarMovimentos((v) => !v)}
        aria-expanded={mostrarMovimentos}
      >
        <span>
          {mostrarMovimentos ? 'Ocultar' : 'Ver'} movimentos ({goal.transacoes.length})
        </span>
        <span className={`goal-card__seta ${mostrarMovimentos ? 'goal-card__seta--aberta' : ''}`}>
          ⌄
        </span>
      </button>

      {mostrarMovimentos && (
        <ul className="goal-card__lista-movimentos">
          {movimentosOrdenados.length === 0 && (
            <li className="goal-card__movimento-vazio">Ainda não há movimentos.</li>
          )}
          {movimentosOrdenados.map((mov) => (
            <li key={mov.id} className="goal-card__movimento">
              <div className="goal-card__movimento-info">
                <span className="goal-card__movimento-descricao">{mov.descricao}</span>
                <span className="goal-card__movimento-data">{formatarData(mov.data)}</span>
              </div>
              <div className="goal-card__movimento-direita">
                <span
                  className={
                    mov.tipo === 'receita'
                      ? 'goal-card__valor--receita'
                      : 'goal-card__valor--despesa'
                  }
                >
                  {mov.tipo === 'receita' ? '+' : '-'}
                  {formatarMoeda(mov.valor)}
                </span>
                <button
                  type="button"
                  className="goal-card__remover-movimento"
                  onClick={() => onEliminarMovimento(goal.id, mov.id)}
                  aria-label="Remover movimento"
                  title="Remover movimento"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <footer className="goal-card__rodape">Criado em {formatarData(goal.dataCriacao)}</footer>
    </article>
  )
}
