import React, { useEffect } from 'react'
import AppRoutes from './AppRoutes'
import { useContextTransactions } from './context/TransactionsContext'
import { useGetTransactions } from './services/useTransactions'

const App: React.FC = () => {
  const { data, isLoading, isError, error } = useGetTransactions()
  const {
    setTransactionData,
    setCards,
    setPaymentMethods,
    setLoadingTransactions,
    setError,
  } = useContextTransactions()

  useEffect(() => {
    setLoadingTransactions(isLoading)
  }, [isLoading])

  useEffect(() => {
    if (data) {
      const allTx = Object.values(data.transactions).flat()

      setTransactionData(allTx)
      setCards(data.metadata.cards)
      setPaymentMethods(data.metadata.paymentMethods)
    }
  }, [data])

  return (
    <div className="mx-auto">
      <AppRoutes />
    </div>
  )
}

export default App
