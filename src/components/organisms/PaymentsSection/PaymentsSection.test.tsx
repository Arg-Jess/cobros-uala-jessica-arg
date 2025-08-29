import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import PaymentsSection from './PaymentsSection'
import { useContextTransactions } from '../../../context/TransactionsContext'
import { downloadCSV } from '../../../utilities/downloadCSV'

jest.mock('../../molecules/TransactionItem/TransactionItem', () => ({
  TransactionItem: ({ transaction }: any) => (
    <div data-testid="transaction-item">{transaction.id}</div>
  ),
}))
jest.mock(
  '../../molecules/SkeletonTransactionList/SkeletonTransactionList',
  () => ({
    SkeletonTransactionList: () => <div data-testid="skeleton-list" />,
  }),
)
jest.mock('../../molecules/InfoCard/InfoCard', () => ({
  __esModule: true,
  default: ({ description }: any) => (
    <div data-testid="info-card">{description}</div>
  ),
}))
jest.mock('../../molecules/DateRangePicker/DateRangePicker', () => ({
  DateRangePicker: ({ onChange, footerButtons }: any) => (
    <div data-testid="date-range-picker">
      <button
        onClick={() =>
          onChange({ from: new Date('2025-01-01'), to: new Date('2025-01-31') })
        }
      >
        Set Range
      </button>
      {footerButtons}
    </div>
  ),
}))
jest.mock('../../atoms/Button/Button', () => ({ onClick, children }: any) => (
  <button onClick={onClick}>{children}</button>
))
jest.mock('../../molecules/InformativeAlert/InformativeAlert', () => ({
  InformativeAlert: ({ description }: any) => (
    <div data-testid="informative-alert">{description}</div>
  ),
}))
jest.mock('../FilterSidePanel/FilterSidePanel', () => () => (
  <div data-testid="filter-panel" />
))
jest.mock('../../../utilities/downloadCSV', () => ({ downloadCSV: jest.fn() }))

const mockContextValue = {
  appState: {
    transactions: [
      { id: 'tx1', createdAt: '2025-01-15', amount: 100 },
      { id: 'tx2', createdAt: '2025-02-01', amount: 50 },
    ],
    loadingTransactions: false,
    isSidePanelOpen: false,
    paymentMethods: [],
    filters: {},
  },
  togglePanel: jest.fn(),
}
jest.mock('../../../context/TransactionsContext', () => ({
  useContextTransactions: jest.fn(),
}))

describe('PaymentsSection', () => {
  beforeEach(() => {
    ;(useContextTransactions as jest.Mock).mockReturnValue(mockContextValue)
  })

  it('renders transaction items when transactions exist', () => {
    render(<PaymentsSection />)

    expect(screen.getAllByTestId('transaction-item')).toHaveLength(2)
    expect(screen.queryByTestId('skeleton-list')).not.toBeInTheDocument()
  })

  it('renders info card when no transactions exist', () => {
    ;(useContextTransactions as jest.Mock).mockReturnValue({
      appState: { ...mockContextValue.appState, transactions: [] },
      togglePanel: jest.fn(),
    })
    render(<PaymentsSection />)

    expect(screen.getByTestId('info-card')).toBeInTheDocument()
  })

  it('opens filter panel on FilterIcon click', () => {
    render(<PaymentsSection />)
    fireEvent.click(
      screen.getByRole('button', { name: /abrir panel de filtros/i }),
    )
    expect(mockContextValue.togglePanel).toHaveBeenCalledWith(true)
  })

  it('opens and closes the calendar', () => {
    render(<PaymentsSection />)

    fireEvent.click(
      screen.getByRole('button', { name: /abrir calendario de descarga/i }),
    )
    expect(screen.getByTestId('date-range-picker')).toBeInTheDocument()

    fireEvent.click(screen.getByText(/Cerrar/i))
    expect(screen.queryByTestId('date-range-picker')).not.toBeInTheDocument()
  })

  it('shows informative alert when download has no transactions', async () => {
    ;(useContextTransactions as jest.Mock).mockReturnValue({
      appState: { ...mockContextValue.appState, transactions: [] },
      togglePanel: jest.fn(),
    })
    render(<PaymentsSection />)

    fireEvent.click(
      screen.getByRole('button', { name: /abrir calendario de descarga/i }),
    )

    fireEvent.click(screen.getByText(/Descargar/i))

    await waitFor(() => {
      expect(screen.getByTestId('informative-alert')).toBeInTheDocument()
    })
  })

  it('calls downloadCSV when transactions exist in range', () => {
    render(<PaymentsSection />)

    fireEvent.click(
      screen.getByRole('button', { name: /abrir calendario de descarga/i }),
    )
    fireEvent.click(screen.getByText('Set Range'))

    fireEvent.click(screen.getByText(/Descargar/i))
    expect(downloadCSV).toHaveBeenCalled()
  })
})
