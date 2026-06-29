/**
 * Formata um número como moeda em euros, no formato português.
 */
export function formatarMoeda(valor) {
  const numero = Number(valor) || 0
  return numero.toLocaleString('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  })
}

/**
 * Formata uma data ISO (yyyy-mm-dd ou ISO completo) para dd/mm/aaaa.
 */
export function formatarData(dataISO) {
  if (!dataISO) return '—'
  const data = new Date(dataISO)
  if (Number.isNaN(data.getTime())) return '—'
  return data.toLocaleDateString('pt-PT')
}

/**
 * Devolve a data de hoje no formato yyyy-mm-dd, pronta para um <input type="date">.
 */
export function dataDeHoje() {
  const hoje = new Date()
  const ano = hoje.getFullYear()
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const dia = String(hoje.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

/**
 * Gera um identificador único, com fallback para navegadores sem
 * suporte a crypto.randomUUID.
 */
export function gerarId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
