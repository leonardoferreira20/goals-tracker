import { useState } from 'react'
import Modal from './Modal.jsx'
import '../styles/Forms.css'

const ESTADO_VAZIO = { nome: '', descricao: '', valorAlvo: '' }

/**
 * Formulário (dentro de modal) para criar ou editar um objetivo.
 * Quando `goalInicial` é passado, o formulário funciona em modo de edição.
 */
export default function GoalForm({ aberto, goalInicial, onSubmit, onClose }) {
  const emEdicao = Boolean(goalInicial)

  const [valores, setValores] = useState(() =>
    goalInicial
      ? {
          nome: goalInicial.nome,
          descricao: goalInicial.descricao || '',
          valorAlvo: String(goalInicial.valorAlvo),
        }
      : ESTADO_VAZIO
  )
  const [erros, setErros] = useState({})

  // Nota: o componente é remontado com uma `key` diferente em App.jsx sempre
  // que se abre para criar vs. editar um goal, para que o estado inicial
  // (useState acima) reflita sempre o goal correto sem precisar de efeitos.

  function validar() {
    const novosErros = {}
    if (!valores.nome.trim()) {
      novosErros.nome = 'Indica um nome para o objetivo.'
    }
    const numeroValorAlvo = Number(valores.valorAlvo)
    if (!valores.valorAlvo || Number.isNaN(numeroValorAlvo) || numeroValorAlvo <= 0) {
      novosErros.valorAlvo = 'O valor alvo tem de ser maior do que 0€.'
    }
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  function aoSubmeter(evento) {
    evento.preventDefault()
    if (!validar()) return

    onSubmit({
      nome: valores.nome.trim(),
      descricao: valores.descricao.trim(),
      valorAlvo: Number(valores.valorAlvo),
    })
  }

  return (
    <Modal
      aberto={aberto}
      onClose={onClose}
      titulo={emEdicao ? 'Editar objetivo' : 'Novo objetivo'}
    >
      <form className="form" onSubmit={aoSubmeter} noValidate>
        <div className="form__campo">
          <label className="form__label" htmlFor="goal-nome">
            Nome
          </label>
          <input
            id="goal-nome"
            className="form__input"
            type="text"
            placeholder="Ex: Comprar um carro"
            value={valores.nome}
            onChange={(e) => setValores((v) => ({ ...v, nome: e.target.value }))}
            autoFocus
          />
          {erros.nome && <span className="form__erro">{erros.nome}</span>}
        </div>

        <div className="form__campo">
          <label className="form__label" htmlFor="goal-descricao">
            Descrição <span className="form__opcional">(opcional)</span>
          </label>
          <textarea
            id="goal-descricao"
            className="form__textarea"
            placeholder="Notas sobre este objetivo..."
            value={valores.descricao}
            onChange={(e) => setValores((v) => ({ ...v, descricao: e.target.value }))}
          />
        </div>

        <div className="form__campo">
          <label className="form__label" htmlFor="goal-valor-alvo">
            Valor alvo
          </label>
          <div className="form__grupo-valor">
            <span className="form__prefixo">€</span>
            <input
              id="goal-valor-alvo"
              className="form__input form__input--money"
              type="number"
              min="0"
              step="0.01"
              placeholder="15000"
              value={valores.valorAlvo}
              onChange={(e) => setValores((v) => ({ ...v, valorAlvo: e.target.value }))}
            />
          </div>
          {erros.valorAlvo && <span className="form__erro">{erros.valorAlvo}</span>}
        </div>

        <div className="form__acoes">
          <button type="button" className="botao botao--secundario" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="botao botao--primario">
            {emEdicao ? 'Guardar alterações' : 'Criar objetivo'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
