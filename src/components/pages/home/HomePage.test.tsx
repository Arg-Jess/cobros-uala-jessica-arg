import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import HomePage from './HomePage'
import { useContextTransactions } from '../../../context/TransactionsContext'

jest.mock('../../molecules/UserHeader/UserHeader', () => () => (
  <div data-testid="user-header" />
))
jest.mock('../../molecules/SummaryTabs/SummaryTabs', () => () => (
  <div data-testid="summary-tabs" />
))
jest.mock('../../organisms/PaymentsSection/PaymentsSection', () => () => (
  <div data-testid="payments-section" />
))
jest.mock('../../molecules/Sidebar/Sidebar', () => () => (
  <div data-testid="sidebar" />
))
jest.mock(
  '../../molecules/NavBar/NavBar',
  () =>
    ({ setOpenMenu, openMenu }: any) => (
      <div
        data-testid="nav-bar"
        onClick={() => setOpenMenu(!openMenu)}
      >{`NavBar ${openMenu}`}</div>
    ),
)

const mockContextValue = {
  appState: {
    isSidePanelOpen: false,
  },
}
jest.mock('../../../context/TransactionsContext', () => ({
  useContextTransactions: jest.fn(),
}))

describe('HomePage', () => {
  beforeEach(() => {
    ;(useContextTransactions as jest.Mock).mockReturnValue(mockContextValue)
  })

  it('renders all main components', () => {
    render(<HomePage />)

    expect(screen.getByTestId('nav-bar')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('user-header')).toBeInTheDocument()
    expect(screen.getByTestId('summary-tabs')).toBeInTheDocument()
    expect(screen.getByTestId('payments-section')).toBeInTheDocument()
  })

  it('toggles NavBar openMenu state on click', () => {
    render(<HomePage />)
    const navBar = screen.getByTestId('nav-bar')

    expect(navBar.textContent).toBe('NavBar false')

    fireEvent.click(navBar)
    expect(navBar.textContent).toBe('NavBar true')
  })

  it('applies overflow-hidden class when side panel is open', () => {
    ;(useContextTransactions as jest.Mock).mockReturnValue({
      appState: { isSidePanelOpen: true },
    })
    render(<HomePage />)
    const main = screen.getByRole('main')
    expect(main).toHaveClass('overflow-hidden')
  })
})
