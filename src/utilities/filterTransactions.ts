import { FilterState, Transaction } from '../types'

export const filterTransactions = (
  transactions: Transaction[],
  filters: FilterState,
): Transaction[] => {
  return transactions.filter(t => {
    // 1. Filtrar por fecha
    if (filters.dateRange) {
      const { from, to } = filters.dateRange

      const transactionDate = new Date(t.createdAt)

      if (from && transactionDate < from) return false
      if (to && transactionDate > to) return false
    }

    // 2. Filtrar por tarjetas

    if (filters.cards?.length) {
      const cardValues = filters.cards.map(c => c.value)

      if (cardValues.includes('all')) {
        return true
      }
      if (!cardValues.includes(t.card)) {
        return false
      }
    }

    // 3. Filtrar por cuotas (installments)

    if (filters.installments?.length) {
      const installmentValues = filters.installments.map(i => i.value)

      if (installmentValues.includes('all')) {
        return true
      }

      if (!installmentValues.includes(t.installments.toString())) {
        return false
      }
    }

    // 4. Filtrar por monto
    if (filters.amountRange) {
      const { min, max } = filters.amountRange
      if (min !== null && t.amount < min) return false
      if (max !== null && t.amount > max) return false
    }

    // 5. Filtrar por métodos de pago
    if (filters.paymentMethods?.length) {
      const methodValues = filters.paymentMethods.map(m => m.value)
      if (!methodValues.includes(t.paymentMethod)) return false
    }

    return true
  })
}
