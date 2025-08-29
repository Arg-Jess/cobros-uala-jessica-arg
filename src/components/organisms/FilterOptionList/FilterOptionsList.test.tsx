import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterOptionsList from './FilterOptionList'

jest.mock(
  '../../molecules/FilterDate/FilterDate',
  () =>
    ({ onChange }: any) => (
      <button
        data-testid="filter-date"
        onClick={() => onChange({ from: new Date(), to: new Date() })}
      >
        Date
      </button>
    ),
)
jest.mock(
  '../../molecules/FilterAmount/FilterAmount',
  () =>
    ({ onChange }: any) => (
      <button
        data-testid="filter-amount"
        onClick={() => onChange({ min: 0, max: 100 })}
      >
        Amount
      </button>
    ),
)
jest.mock(
  '../../molecules/FilterChips/FilterChips',
  () =>
    ({ options, selected, onChange }: any) => (
      <>
        {options.map((o: any) => (
          <button
            key={o.value}
            data-testid={`chip-${o.value}`}
            onClick={() => onChange(o)}
          >
            {o.label}
          </button>
        ))}
      </>
    ),
)
jest.mock(
  '../../molecules/FilterOption/FilterOption',
  () =>
    ({ label, children, onToggle }: any) => (
      <div>
        <span>{label}</span>
        <button data-testid={`toggle-${label}`} onClick={() => onToggle(false)}>
          Toggle
        </button>
        {children}
      </div>
    ),
)
jest.mock('../../../constants/installments', () => ({
  INSTALLMENTS_OPTIONS_OBJ: [{ value: 'installment1', label: '1 cuota' }],
}))

describe('FilterOptionsList Full Coverage', () => {
  const setTempFiltersMock = jest.fn()
  const handleDateChangeMock = jest.fn()
  const handleAmountChangeMock = jest.fn()
  const handleChipToggleMock = jest.fn()
  const clearFilterByLabelMock = jest.fn()

  const tempFilters = {
    dateRange: undefined,
    cards: [],
    installments: [],
    amountRange: undefined,
    paymentMethods: [],
  }

  const options = [
    { label: 'Fecha', icon: <></> },
    { label: 'Tarjeta', icon: <></> },
    { label: 'Cuotas', icon: <></> },
    { label: 'Monto', icon: <></> },
    { label: 'Métodos de cobro', icon: <></> },
  ]

  const cards = [{ value: 'card1', label: 'Card 1' }]
  const paymentMethods = [{ value: 'pm1', label: 'PM 1' }]
  const installments = [{ value: 'installment1', label: '1 cuota' }]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all filters and toggles', () => {
    render(
      <FilterOptionsList
        options={options}
        tempFilters={tempFilters}
        setTempFilters={setTempFiltersMock}
        resetSignal={0}
        clearFilterByLabel={clearFilterByLabelMock}
        handleDateChange={handleDateChangeMock}
        handleAmountChange={handleAmountChangeMock}
        handleChipToggle={handleChipToggleMock}
        paymentMethods={paymentMethods}
        cards={cards}
      />,
    )

    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
      expect(screen.getByTestId(`toggle-${option.label}`)).toBeInTheDocument()
    })
  })

  it('handles Date and Amount changes', () => {
    render(
      <FilterOptionsList
        options={options}
        tempFilters={tempFilters}
        setTempFilters={setTempFiltersMock}
        resetSignal={0}
        clearFilterByLabel={clearFilterByLabelMock}
        handleDateChange={handleDateChangeMock}
        handleAmountChange={handleAmountChangeMock}
        handleChipToggle={handleChipToggleMock}
        paymentMethods={paymentMethods}
        cards={cards}
      />,
    )
    fireEvent.click(screen.getByTestId('filter-date'))
    fireEvent.click(screen.getByTestId('filter-amount'))

    expect(handleDateChangeMock).toHaveBeenCalled()
    expect(handleAmountChangeMock).toHaveBeenCalled()
  })
  it('handles cards chips including "Todas" and individual', () => {
    render(
      <FilterOptionsList
        options={options}
        tempFilters={{ ...tempFilters, cards: [] }}
        setTempFilters={setTempFiltersMock}
        resetSignal={0}
        clearFilterByLabel={clearFilterByLabelMock}
        handleDateChange={handleDateChangeMock}
        handleAmountChange={handleAmountChangeMock}
        handleChipToggle={handleChipToggleMock}
        paymentMethods={paymentMethods}
        cards={cards}
      />,
    )

    const allChips = screen.getAllByTestId('chip-all')
    fireEvent.click(allChips[0])
    expect(setTempFiltersMock).toHaveBeenCalledWith(
      expect.objectContaining({
        cards: [{ value: 'all', label: 'Todas' }],
      }),
    )

    fireEvent.click(screen.getByTestId('chip-card1'))
    expect(handleChipToggleMock).toHaveBeenCalled()
  })

  it('handles installments chips including "Todas" y individual', () => {
    render(
      <FilterOptionsList
        options={options}
        tempFilters={{ ...tempFilters, installments: [] }}
        setTempFilters={setTempFiltersMock}
        resetSignal={0}
        clearFilterByLabel={clearFilterByLabelMock}
        handleDateChange={handleDateChangeMock}
        handleAmountChange={handleAmountChangeMock}
        handleChipToggle={handleChipToggleMock}
        paymentMethods={paymentMethods}
        cards={cards}
      />,
    )

    const allChips = screen.getAllByTestId('chip-all')
    fireEvent.click(allChips[1])
    expect(setTempFiltersMock).toHaveBeenCalledWith(
      expect.objectContaining({
        installments: [{ value: 'all', label: 'Todas' }],
      }),
    )

    fireEvent.click(screen.getByTestId('chip-installment1'))
    expect(handleChipToggleMock).toHaveBeenCalled()
  })

  it('handles payment methods chips', () => {
    render(
      <FilterOptionsList
        options={options}
        tempFilters={{ ...tempFilters, paymentMethods: [] }}
        setTempFilters={setTempFiltersMock}
        resetSignal={0}
        clearFilterByLabel={clearFilterByLabelMock}
        handleDateChange={handleDateChangeMock}
        handleAmountChange={handleAmountChangeMock}
        handleChipToggle={handleChipToggleMock}
        paymentMethods={paymentMethods}
        cards={cards}
      />,
    )

    fireEvent.click(screen.getByTestId('chip-pm1'))
    expect(handleChipToggleMock).toHaveBeenCalled()
  })

  it('calls clearFilterByLabel on toggle deactivation', () => {
    render(
      <FilterOptionsList
        options={options}
        tempFilters={tempFilters}
        setTempFilters={setTempFiltersMock}
        resetSignal={0}
        clearFilterByLabel={clearFilterByLabelMock}
        handleDateChange={handleDateChangeMock}
        handleAmountChange={handleAmountChangeMock}
        handleChipToggle={handleChipToggleMock}
        paymentMethods={paymentMethods}
        cards={cards}
      />,
    )

    options.forEach(option => {
      fireEvent.click(screen.getByTestId(`toggle-${option.label}`))
      expect(clearFilterByLabelMock).toHaveBeenCalledWith(option.label)
    })
  })
})
