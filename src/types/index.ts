export interface Transaction {
  amount: number
  card: string
  id: string
  createdAt: string
  paymentMethod: string
  installments: number
}

export interface FilterState {
  dateRange?: { from: Date | null; to: Date | null }
  cards?: { value: string; label: string }[]
  installments?: { value: string; label: string }[]
  amountRange?: { min: number | null; max: number | null }
  paymentMethods?: { value: string; label: string }[]
}
