import { FC, ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'filled' | 'outline'
  color?: string
  disabled?: boolean
  onClick?: () => void
  className?: string
  px?: string
  py?: string
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'filled',
  color = 'blue-500',
  disabled = false,
  onClick,
  className = '',
  px = '6',
  py = '3',
}) => {
  const baseClasses = `py-${py} px-${px} font-medium text-sm transition-colors duration-300 focus:outline-none rounded-[24px] cursor-pointer`

  let variantClasses = ''
  if (disabled) {
    variantClasses =
      'bg-semi-grey text-white border border-semi-grey cursor-not-allowed'
  } else if (variant === 'filled') {
    variantClasses = `bg-${color} text-white border border-${color} hover:bg-${color}-600`
  } else if (variant === 'outline') {
    variantClasses = `bg-white text-${color} border border-${color} hover:bg-${color}-100`
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
