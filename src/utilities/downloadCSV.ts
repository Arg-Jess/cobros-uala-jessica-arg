import { Transaction } from '../types'

export const downloadCSV = (transactions: Transaction[]) => {
  const headers = Object.keys(transactions[0]).join(',')
  const rows = transactions.map(tx =>
    Object.values(tx)
      .map(val => `"${val}"`)
      .join(','),
  )
  const csv = [headers, ...rows].join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'transactions.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
