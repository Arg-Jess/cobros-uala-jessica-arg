import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterOption from './FilterOption'

describe('FilterOption', () => {
  const icon = <span data-testid="icon">Icon</span>
  const children = <div data-testid="children">Children</div>
  const label = 'Test Label'

  it('renders label and icon', () => {
    render(<FilterOption label={label} icon={icon} />)
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('toggles active state on click and shows children', () => {
    render(<FilterOption label={label} icon={icon} children={children} />)

    expect(screen.queryByTestId('children')).not.toBeInTheDocument()

    const toggleDiv = screen.getByText(label)
    fireEvent.click(toggleDiv)

    expect(screen.getByTestId('children')).toBeInTheDocument()
  })

  it('calls onToggle with correct value', () => {
    const onToggleMock = jest.fn()
    render(<FilterOption label={label} icon={icon} onToggle={onToggleMock} />)

    const toggleDiv = screen.getByText(label)
    fireEvent.click(toggleDiv)
    expect(onToggleMock).toHaveBeenCalledWith(true)

    fireEvent.click(toggleDiv)
    expect(onToggleMock).toHaveBeenCalledWith(false)
  })

  it('resets active state when resetSignal changes', () => {
    const { rerender } = render(
      <FilterOption
        label={label}
        icon={icon}
        children={children}
        resetSignal={0}
      />,
    )

    const toggleDiv = screen.getByText(label)
    fireEvent.click(toggleDiv)
    expect(screen.getByTestId('children')).toBeInTheDocument()

    rerender(
      <FilterOption
        label={label}
        icon={icon}
        children={children}
        resetSignal={1}
      />,
    )
    expect(screen.queryByTestId('children')).not.toBeInTheDocument()
  })
})
