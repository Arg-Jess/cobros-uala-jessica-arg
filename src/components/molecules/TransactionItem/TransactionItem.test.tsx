import { render, screen } from '@testing-library/react'
import { TransactionItem } from './TransactionItem'
import { Transaction } from '../../../types'
import * as numberFormat from '../../../utilities/numberFormat'
import { PaymentMethod } from '../../../types/paymentMethod'

jest.mock('../../../assets/icons/StoreIcon', () => () => (
  <div data-testid="store-icon" />
))

describe('TransactionItem', () => {
  const mockTransaction: Transaction = {
    id: '1',
    amount: 1234.56,
    createdAt: '2025-08-28T10:00:00.000Z',
    paymentMethod: 'credit_card',
    card: 'Visa',
    installments: 1,
  }

  const mockPaymentMethods: PaymentMethod[] = [
    { value: 'credit_card', label: 'Tarjeta de Crédito' },
    { value: 'paypal', label: 'PayPal' },
  ]

  beforeAll(() => {
    jest
      .spyOn(numberFormat, 'formattedWithDecimals')
      .mockReturnValue('1,234.56')
  })

  it('renders payment method label', () => {
    render(
      <TransactionItem
        transaction={mockTransaction}
        paymentMethods={mockPaymentMethods}
      />,
    )
    expect(screen.getByText('Tarjeta de Crédito')).toBeInTheDocument()
  })

  it('renders "Venta"', () => {
    render(
      <TransactionItem
        transaction={mockTransaction}
        paymentMethods={mockPaymentMethods}
      />,
    )
    expect(screen.getByText('Venta')).toBeInTheDocument()
  })

  it('renders formatted amount', () => {
    render(
      <TransactionItem
        transaction={mockTransaction}
        paymentMethods={mockPaymentMethods}
      />,
    )
    expect(screen.getByText(/\+\$1,234\.56/)).toBeInTheDocument()
  })

  it('renders formatted date', () => {
    render(
      <TransactionItem
        transaction={mockTransaction}
        paymentMethods={mockPaymentMethods}
      />,
    )
    expect(screen.getByText('28/08/2025')).toBeInTheDocument()
  })

  it('renders the StoreIcon', () => {
    render(
      <TransactionItem
        transaction={mockTransaction}
        paymentMethods={mockPaymentMethods}
      />,
    )
    expect(screen.getByTestId('store-icon')).toBeInTheDocument()
  })
})
