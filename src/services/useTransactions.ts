import { useQuery } from '@tanstack/react-query'
import api from './axionInstance'
import { Transaction } from '../types'
import { PaymentMethod } from '../types/paymentMethod'
import { Card } from '../types/Card'
import { getTransactionsMock } from '../../__mocks__/fileMock'

export interface TransactionRes {
  transactions: Transaction[]
  metadata: {
    cards: Card[]
    paymentMethods: PaymentMethod[]
  }
}

// export const getTransactions = async (): Promise<TransactionRes> => {
//   const response = await api.get<TransactionRes>('/transactions.json')
//   return response.data
// }

export const useGetTransactions = () => {
  return useQuery<TransactionRes>({
    queryKey: ['transactions'],
    queryFn: getTransactionsMock,
    gcTime: 0,
    refetchOnMount: true,
  })
}
