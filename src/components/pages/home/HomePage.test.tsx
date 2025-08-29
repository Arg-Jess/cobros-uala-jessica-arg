import { render, screen } from '@testing-library/react'
import HomePage from './HomePage'

jest.mock('../../molecules/SummaryTabs/SummaryTabs', () => () => (
  <div data-testid="summary-tabs" />
))
jest.mock('../../organisms/PaymentsSection/PaymentsSection', () => () => (
  <div data-testid="payments-section" />
))

describe('HomePage', () => {
  it('renders SummaryTabs and PaymentsSection', () => {
    render(<HomePage />)

    expect(screen.getByTestId('summary-tabs')).toBeInTheDocument()
    expect(screen.getByTestId('payments-section')).toBeInTheDocument()
  })

  it('has correct container classes for layout', () => {
    const { container } = render(<HomePage />)
    const mainDiv = container.firstChild

    expect(mainDiv).toHaveClass(
      'flex-1',
      'bg-light-white',
      'flex',
      'flex-col',
      'items-center',
      'pt-6',
      'mt-[64px]',
      'md:mt-[0]',
    )
  })
})
