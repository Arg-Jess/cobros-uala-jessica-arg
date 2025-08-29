import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'

jest.mock('../../atoms/Logo/Logo', () => ({
  Logo: () => <div data-testid="logo" />,
}))

jest.mock('../../../assets/icons/HamburguerMenuIcon', () => () => (
  <div data-testid="hamburguer-icon" />
))

jest.mock('../../../../public/assets/Subtract.svg', () => 'mocked-file')

describe('Header component', () => {
  it('renders correctly', () => {
    const mockSetOpenMenu = jest.fn()
    render(<Header openMenu={false} setOpenMenu={mockSetOpenMenu} />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    expect(screen.getByTestId('logo')).toBeInTheDocument()

    expect(screen.getByTestId('hamburguer-icon')).toBeInTheDocument()

    const img = screen.getByRole('img', { hidden: true })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'mocked-file')
  })

  it('calls setOpenMenu when button is clicked', () => {
    const mockSetOpenMenu = jest.fn()
    render(<Header openMenu={false} setOpenMenu={mockSetOpenMenu} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetOpenMenu).toHaveBeenCalledTimes(1)
    expect(mockSetOpenMenu).toHaveBeenCalledWith(true)
  })

  it('toggles openMenu correctly when openMenu=true', () => {
    const mockSetOpenMenu = jest.fn()
    render(<Header openMenu={true} setOpenMenu={mockSetOpenMenu} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetOpenMenu).toHaveBeenCalledWith(false)
  })
})
