import '../styles/ProgressBar.css'

/**
 * Barra de progresso com aspeto de "régua de caderneta": traços a cada 10%
 * e um selo circular com a percentagem que acompanha o enchimento.
 * O valor já deve chegar limitado a [0, 100] (ver utils/calculations.js).
 */
export default function ProgressBar({ valor, concluido = false }) {
  const percentagemTexto = `${Math.round(valor)}%`
  // Mantemos o selo dentro dos limites visuais do traço, mesmo nos extremos.
  const posicaoSelo = Math.min(94, Math.max(6, valor))

  return (
    <div className="progresso">
      <div className="progresso__selo" style={{ left: `${posicaoSelo}%` }} aria-hidden="true">
        {percentagemTexto}
      </div>

      <div
        className="progresso__pista"
        role="progressbar"
        aria-valuenow={Math.round(valor)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progresso__tracos" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, indice) => (
            <span key={indice} className="progresso__traco" />
          ))}
        </div>
        <div
          className={`progresso__enchimento ${concluido ? 'progresso__enchimento--completo' : ''}`}
          style={{ width: `${valor}%` }}
        />
      </div>
    </div>
  )
}
