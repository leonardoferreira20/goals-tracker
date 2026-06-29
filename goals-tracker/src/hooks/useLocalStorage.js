import { useEffect, useState } from 'react'

/**
 * Hook que mantém um estado React sincronizado com o Local Storage.
 * Os dados são lidos automaticamente quando a aplicação arranca e
 * gravados sempre que o valor é alterado.
 *
 * @param {string} chave - chave usada no Local Storage
 * @param {*} valorInicial - valor por defeito quando não há dados guardados
 */
export function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(chave)
      return guardado !== null ? JSON.parse(guardado) : valorInicial
    } catch (erro) {
      console.error(`Não foi possível ler "${chave}" do Local Storage:`, erro)
      return valorInicial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor))
    } catch (erro) {
      console.error(`Não foi possível guardar "${chave}" no Local Storage:`, erro)
    }
  }, [chave, valor])

  return [valor, setValor]
}
