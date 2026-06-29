/**
 * Lógica de cálculo dos objetivos financeiros.
 * Mantida isolada dos componentes para ser fácil de testar e reutilizar.
 */

/**
 * Soma as receitas e despesas de uma lista de movimentos.
 * @param {Array<{tipo: 'receita'|'despesa', valor: number}>} transacoes
 */
export function calcularTotais(transacoes = []) {
  const totalReceitas = transacoes
    .filter((t) => t.tipo === 'receita')
    .reduce((soma, t) => soma + Number(t.valor || 0), 0)

  const totalDespesas = transacoes
    .filter((t) => t.tipo === 'despesa')
    .reduce((soma, t) => soma + Number(t.valor || 0), 0)

  const saldoAtual = totalReceitas - totalDespesas

  return { totalReceitas, totalDespesas, saldoAtual }
}

/**
 * Progresso (%) = (Saldo Atual / Valor Alvo) × 100
 * Limitado entre 0% e 100% para efeitos visuais.
 */
export function calcularProgresso(saldoAtual, valorAlvo) {
  if (!valorAlvo || valorAlvo <= 0) return 0
  const progresso = (saldoAtual / valorAlvo) * 100
  return Math.min(100, Math.max(0, progresso))
}

/**
 * Devolve o conjunto completo de métricas de um objetivo.
 */
export function calcularResumoGoal(goal) {
  const { totalReceitas, totalDespesas, saldoAtual } = calcularTotais(goal.transacoes)
  const progresso = calcularProgresso(saldoAtual, goal.valorAlvo)
  const concluido = goal.valorAlvo > 0 && saldoAtual >= goal.valorAlvo

  return { totalReceitas, totalDespesas, saldoAtual, progresso, concluido }
}
