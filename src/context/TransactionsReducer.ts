import { FilterState, Transaction } from '../types'
import { AppState } from './TransactionsContext'

export type Action =
  | { type: 'setTransactionData'; payload: Transaction[] }
  | { type: 'setFilter'; payload: Partial<FilterState> }
  | { type: 'resetFilter' }
  | { type: 'setCards'; payload: { value: string; label: string }[] }
  | { type: 'setPaymentMethods'; payload: { value: string; label: string }[] }
  | { type: 'togglePanel'; payload: boolean }
  | { type: 'setLoadingTransactions'; payload: boolean }
  | { type: 'setError'; payload: string | null }

export const INITIAL_APP_STATE: AppState = {
  transactions: [],
  cards: [],
  paymentMethods: [],
  filters: {},
  isSidePanelOpen: false,
  loadingTransactions: false,
  error: null,
}

export const transactionsReducer = (
  state: AppState,
  action: Action,
): AppState => {
  switch (action.type) {
    case 'setTransactionData':
      return { ...state, transactions: action.payload }
    case 'setFilter':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      }
    case 'resetFilter':
      return { ...state, filters: {} }
    case 'setCards':
      return { ...state, cards: action.payload }
    case 'setPaymentMethods':
      return { ...state, paymentMethods: action.payload }
    case 'togglePanel':
      return { ...state, isSidePanelOpen: action.payload }
    case 'setLoadingTransactions':
      return { ...state, loadingTransactions: action.payload }
    case 'setError':
      return { ...state, error: action.payload }
    default:
      return state
  }
}
