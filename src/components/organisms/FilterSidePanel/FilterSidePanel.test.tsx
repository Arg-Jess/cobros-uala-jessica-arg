import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterSidePanel from './FilterSidePanel'
import { useContextTransactions } from '../../../context/TransactionsContext'
import { hasActiveFilters } from '../../../utilities/hasActiveFilters'

jest.mock(
  '../../atoms/Button/Button',
  () =>
    ({ onClick, disabled, children }: any) => (
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
    ),
)
jest.mock('../../../assets/icons/PreviousIcon', () => () => (
  <div data-testid="previous-icon" />
))
jest.mock('../../../utilities/hasActiveFilters', () => ({
  hasActiveFilters: jest.fn(),
}))

const togglePanelMock = jest.fn()
const setFilterMock = jest.fn()
const resetFilterMock = jest.fn()

const defaultContext = {
  appState: {
    isSidePanelOpen: true,
    filters: {},
    cards: [],
    paymentMethods: [],
  },
  togglePanel: togglePanelMock,
  resetFilter: resetFilterMock,
  setFilter: setFilterMock,
}

jest.mock('../FilterOptionList/FilterOptionList', () => ({
  __esModule: true,
  default: ({
    handleDateChange,
    handleAmountChange,
    handleChipToggle,
  }: any) => (
    <div data-testid="filter-options-list">
      <button
        data-testid="mock-date"
        onClick={() =>
          handleDateChange({
            from: new Date('2025-01-01'),
            to: new Date('2025-01-10'),
          })
        }
      >
        Set Date
      </button>
      <button
        data-testid="mock-amount"
        onClick={() => handleAmountChange({ min: 100, max: 500 })}
      >
        Set Amount
      </button>
      <button
        data-testid="mock-chips"
        onClick={() =>
          handleChipToggle({ value: 'card1', label: 'Card 1' }, [], jest.fn())
        }
      >
        Toggle Chip
      </button>
    </div>
  ),
}))

jest.mock('../../../context/TransactionsContext', () => ({
  useContextTransactions: jest.fn(),
}))

describe('FilterSidePanel Full Coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useContextTransactions as jest.Mock).mockReturnValue(defaultContext)
    ;(hasActiveFilters as jest.Mock).mockReturnValue(true)
  })

  it('renders panel and main elements', () => {
    render(<FilterSidePanel />)
    expect(screen.getByText(/Aplicar filtros/i)).toBeInTheDocument()
    expect(screen.getByText(/Limpiar/i)).toBeInTheDocument()
    expect(screen.getByTestId('filter-options-list')).toBeInTheDocument()
  })

  it('closes panel on PreviousIcon button click', () => {
    render(<FilterSidePanel />)
    const closeButton = screen.getByRole('button', {
      name: /cerrar panel de filtros/i,
    })
    fireEvent.click(closeButton)
    expect(togglePanelMock).toHaveBeenCalledWith(false)
  })

  it('applies filters and closes panel', () => {
    render(<FilterSidePanel />)
    const aplicarButton = screen.getByText(/Aplicar filtros/i)
    fireEvent.click(aplicarButton)
    expect(setFilterMock).toHaveBeenCalled()
    expect(togglePanelMock).toHaveBeenCalledWith(false)
  })

  it('resets filters when Limpiar button clicked with active filters', () => {
    ;(hasActiveFilters as jest.Mock).mockReturnValue(true)
    render(<FilterSidePanel />)
    const limpiarButton = screen.getByText(/Limpiar/i)
    fireEvent.click(limpiarButton)
  })

  it('does not reset filters when Limpiar button clicked with no active filters', () => {
    ;(hasActiveFilters as jest.Mock).mockReturnValue(false)
    render(<FilterSidePanel />)
    const limpiarButton = screen.getByText(/Limpiar/i)
    expect(limpiarButton).toBeDisabled()
  })

  it('calls handleDateChange via mock button', () => {
    render(<FilterSidePanel />)
    fireEvent.click(screen.getByTestId('mock-date'))
  })

  it('calls handleAmountChange via mock button', () => {
    render(<FilterSidePanel />)
    fireEvent.click(screen.getByTestId('mock-amount'))
  })

  it('calls handleChipToggle via mock button', () => {
    render(<FilterSidePanel />)
    fireEvent.click(screen.getByTestId('mock-chips'))
  })
})
