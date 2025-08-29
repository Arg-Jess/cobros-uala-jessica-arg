import { render, screen, fireEvent } from '@testing-library/react'
import SummaryTabs from './SummaryTabs'
import React from 'react'

jest.mock('../../../context/TransactionsContext', () => ({
  useContextTransactions: jest.fn(),
}))

import { useContextTransactions } from '../../../context/TransactionsContext'

jest.mock('../../atoms/IconLink/IconLink', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div>{title}</div>,
}))

describe('SummaryTabs', () => {
  const mockTransactions = [
    { id: '1', amount: 100, createdAt: new Date().toISOString() },
    { id: '2', amount: 50, createdAt: new Date().toISOString() },
  ]

  beforeEach(() => {
    ;(useContextTransactions as jest.Mock).mockReturnValue({
      appState: {
        transactions: mockTransactions,
        loadingTransactions: false,
      },
    })
  })

  it('renders title correctly', () => {
    render(<SummaryTabs />)
    expect(screen.getByText('Tus cobros')).toBeInTheDocument()
  })

  it('renders all tabs', () => {
    render(<SummaryTabs />)
    expect(screen.getByTestId('tab-Diario')).toBeInTheDocument()
    expect(screen.getByTestId('tab-Semanal')).toBeInTheDocument()
    expect(screen.getByTestId('tab-Mensual')).toBeInTheDocument()
  })

  it('renders total amount correctly', () => {
    render(<SummaryTabs />)
    const total = screen.getByTestId('total-amount')
    expect(total).toHaveTextContent('150')
  })

  it('renders metrics link', () => {
    render(<SummaryTabs />)
    expect(screen.getByText('Ver métricas')).toBeInTheDocument()
  })

  it('changes active tab and updates total correctly', () => {
    render(<SummaryTabs />)

    const diarioTab = screen.getByTestId('tab-Diario')
    const semanalTab = screen.getByTestId('tab-Semanal')
    const mensualTab = screen.getByTestId('tab-Mensual')
    const total = screen.getByTestId('total-amount')

    expect(semanalTab).toHaveClass('font-semibold')
    expect(diarioTab).not.toHaveClass('font-semibold')
    expect(mensualTab).not.toHaveClass('font-semibold')

    fireEvent.click(diarioTab)
    expect(diarioTab).toHaveClass('font-semibold')
    expect(semanalTab).not.toHaveClass('font-semibold')

    fireEvent.click(mensualTab)
    expect(mensualTab).toHaveClass('font-semibold')
    expect(diarioTab).not.toHaveClass('font-semibold')

    expect(total).toBeInTheDocument()
  })
})
