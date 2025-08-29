import { ReactNode, useReducer } from 'react'
import { TransactionsContext } from './TransactionsContext'
import { transactionsReducer, INITIAL_APP_STATE } from './TransactionsReducer'
import { FilterState, Transaction } from '../types'
import { hasActiveFilters } from '../utilities/hasActiveFilters'

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(transactionsReducer, INITIAL_APP_STATE)

  const setTransactionData = (transactions: Transaction[]) => {
    dispatch({ type: 'setTransactionData', payload: transactions })
  }

  const setFilter = (filters: Partial<FilterState>) => {
    dispatch({ type: 'setFilter', payload: filters })
  }

  const resetFilter = () => {
    dispatch({ type: 'resetFilter' })
  }

  const setCards = (cards: { value: string; label: string }[]) => {
    dispatch({ type: 'setCards', payload: cards })
  }
  const setPaymentMethods = (cards: { value: string; label: string }[]) => {
    dispatch({ type: 'setPaymentMethods', payload: cards })
  }

  const togglePanel = (isSidePanelOpen: boolean) => {
    dispatch({ type: 'togglePanel', payload: isSidePanelOpen })
  }

  const setLoadingTransactions = (loading: boolean) => {
    dispatch({ type: 'setLoadingTransactions', payload: loading })
  }

  const setError = (error: string | null) => {
    dispatch({ type: 'setError', payload: error })
  }

  const hasFiltersSelected = hasActiveFilters(state.filters)

  return (
    <TransactionsContext.Provider
      value={{
        appState: state,
        setTransactionData,
        setFilter,
        resetFilter,
        setCards,
        setPaymentMethods,
        togglePanel,
        setLoadingTransactions,
        setError,
        hasFiltersSelected,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
