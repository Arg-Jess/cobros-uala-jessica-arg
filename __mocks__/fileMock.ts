export default 'mocked-file'

import transactionsData from './transactions.json'
import { TransactionRes } from '../src/services/useTransactions'

export const getTransactionsMock = async (): Promise<TransactionRes> => {
  // Simula tiempo de red
  await new Promise(resolve => setTimeout(resolve, 300))
  return transactionsData
}
