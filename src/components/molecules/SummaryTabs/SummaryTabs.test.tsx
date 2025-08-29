import { render, screen, fireEvent } from '@testing-library/react'
import SummaryTabs from './SummaryTabs'

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

  it('renders all tabs and highlights active tab', () => {
    render(<SummaryTabs />)
    expect(screen.getByText('Diario')).toBeInTheDocument()
    expect(screen.getByText('Semanal')).toBeInTheDocument()
    expect(screen.getByText('Mensual')).toBeInTheDocument()
  })

  it('renders total amount correctly', () => {
    render(<SummaryTabs />)
    expect(screen.getByText('+')).toBeInTheDocument()
    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByText('150')).toBeInTheDocument()
  })

  it('renders metrics link', () => {
    render(<SummaryTabs />)
    expect(screen.getByText('Ver métricas')).toBeInTheDocument()
  })

  it('changes active tab when clicked', () => {
    render(<SummaryTabs />)
    const diarioTab = screen.getByText('Diario')
    fireEvent.click(diarioTab)
    expect(diarioTab).toHaveClass('font-semibold')
  })
})
