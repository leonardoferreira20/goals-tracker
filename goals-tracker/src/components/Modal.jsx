import { useEffect } from 'react'
import '../styles/Modal.css'

/**
 * Wrapper de modal genérico: fundo escurecido, fecha com Escape ou
 * clique fora do cartão, e bloqueia o scroll da página enquanto aberto.
 */
export default function Modal({ aberto, onClose, titulo, children, largura = 'md' }) {
  useEffect(() => {
    if (!aberto) return

    function aoPressionarTecla(evento) {
      if (evento.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', aoPressionarTecla)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', aoPressionarTecla)
      document.body.style.overflow = ''
    }
  }, [aberto, onClose])

  if (!aberto) return null

  return (
    <div className="modal-overlay" onMouseDown={onClose} role="presentation">
      <div
        className={`modal-card modal-card--${largura}`}
        onMouseDown={(evento) => evento.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
      >
        <div className="modal-card__header">
          <h2 id="modal-titulo" className="modal-card__titulo">
            {titulo}
          </h2>
          <button
            type="button"
            className="modal-card__fechar"
            onClick={onClose}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        <div className="modal-card__corpo">{children}</div>
      </div>
    </div>
  )
}
