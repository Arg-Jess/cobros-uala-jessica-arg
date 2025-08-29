import { createContext, useContext } from 'react'
import { FilterState, Transaction } from '../types'

export interface AppState {
  transactions: Transaction[]
  filters: FilterState
  cards: { value: string; label: string }[]
  paymentMethods: { value: string; label: string }[]
  isSidePanelOpen: boolean
  loadingTransactions: boolean
  error?: string | null
}

interface TransactionsContextProps {
  appState: AppState
  setTransactionData: (transactions: Transaction[]) => void
  setFilter: (filters: any) => void
  resetFilter: () => void
  setCards: (cards: { value: string; label: string }[]) => void
  setPaymentMethods: (cards: { value: string; label: string }[]) => void
  togglePanel: (isSidePanelOpen: boolean) => void
  setLoadingTransactions: (loadingTransactions: boolean) => void
  setError: (error: string | null) => void
  hasFiltersSelected: boolean
}

export const TransactionsContext = createContext<
  TransactionsContextProps | undefined
>(undefined)

export const useContextTransactions = (): TransactionsContextProps => {
  const context = useContext(TransactionsContext)
  if (!context)
    throw new Error('useTransactions debe estar dentro de TransactionsProvider')
  return context
}
