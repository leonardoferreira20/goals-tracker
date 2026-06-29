import Modal from './Modal.jsx'
import '../styles/Forms.css'

/**
 * Caixa de diálogo de confirmação, usada antes de eliminar um objetivo
 * (ação destrutiva e irreversível).
 */
export default function ConfirmDialog({ aberto, titulo, children, onConfirmar, onCancelar }) {
  return (
    <Modal aberto={aberto} onClose={onCancelar} titulo={titulo} largura="sm">
      <div className="form">
        <p className="confirmar__texto">{children}</p>
        <div className="form__acoes">
          <button type="button" className="botao botao--secundario" onClick={onCancelar}>
            Cancelar
          </button>
          <button type="button" className="botao botao--perigo" onClick={onConfirmar}>
            Eliminar
          </button>
        </div>
      </div>
    </Modal>
  )
}
