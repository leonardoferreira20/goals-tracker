import { useState } from 'react'
import Modal from './Modal.jsx'
import { dataDeHoje } from '../utils/format.js'
import '../styles/Forms.css'

/**
 * Formulário (dentro de modal) para adicionar um movimento — receita ou
 * despesa — a um objetivo específico. O `tipo` define o título, a cor
 * de destaque e o que acontece ao saldo do objetivo.
 */
export default function TransactionForm({ aberto, tipo, onSubmit, onClose }) {
  const ehReceita = tipo === 'receita'

  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [data, setData] = useState(dataDeHoje())
  const [erros, setErros] = useState({})

  function validar() {
    const novosErros = {}
    if (!descricao.trim()) {
      novosErros.descricao = 'Indica uma descrição.'
    }
    const numeroValor = Number(valor)
    if (!valor || Number.isNaN(numeroValor) || numeroValor <= 0) {
      novosErros.valor = 'O valor tem de ser maior do que 0€.'
    }
    if (!data) {
      novosErros.data = 'Escolhe uma data.'
    }
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  function aoSubmeter(evento) {
    evento.preventDefault()
    if (!validar()) return

    onSubmit({ descricao: descricao.trim(), valor: Number(valor), data })

    setDescricao('')
    setValor('')
    setData(dataDeHoje())
    setErros({})
  }

  return (
    <Modal
      aberto={aberto}
      onClose={onClose}
      titulo={ehReceita ? 'Nova receita' : 'Nova despesa'}
      largura="sm"
    >
      <form className="form" onSubmit={aoSubmeter} noValidate>
        <div className="form__campo">
          <label className="form__label" htmlFor="tx-descricao">
            Descrição
          </label>
          <input
            id="tx-descricao"
            className="form__input"
            type="text"
            placeholder={ehReceita ? 'Ex: Bónus de trabalho' : 'Ex: Levantamento para reparação'}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            autoFocus
          />
          {erros.descricao && <span className="form__erro">{erros.descricao}</span>}
        </div>

        <div className="form__campo">
          <label className="form__label" htmlFor="tx-valor">
            Valor
          </label>
          <div className="form__grupo-valor">
            <span className="form__prefixo">€</span>
            <input
              id="tx-valor"
              className="form__input form__input--money"
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
          {erros.valor && <span className="form__erro">{erros.valor}</span>}
        </div>

        <div className="form__campo">
          <label className="form__label" htmlFor="tx-data">
            Data
          </label>
          <input
            id="tx-data"
            className="form__input"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          {erros.data && <span className="form__erro">{erros.data}</span>}
        </div>

        <div className="form__acoes">
          <button type="button" className="botao botao--secundario" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="submit"
            className={`botao ${ehReceita ? 'botao--receita' : 'botao--despesa'}`}
          >
            {ehReceita ? 'Adicionar receita' : 'Adicionar despesa'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
