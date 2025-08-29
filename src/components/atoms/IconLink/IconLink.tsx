import { Link, useLocation } from 'react-router-dom'

interface IconLinkProps {
  icon: React.ElementType
  to: string
  title: string
  defaultColor?: string
  activeColor?: string
  isSelectable?: boolean
  className?: string
}

const IconLink: React.FC<IconLinkProps> = ({
  icon: Icon,
  to,
  title,
  defaultColor = 'text-secondary-grey',
  activeColor = 'text-secondary-blue',
  isSelectable = true,
  className = '',
}) => {
  const location = useLocation()
  const isActive = isSelectable && location.pathname === to

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Icon className={`w-6 h-6 ${isActive ? activeColor : defaultColor}`} />
      <Link to={to} className={`${isActive ? activeColor : defaultColor}`}>
        {title}
      </Link>
    </div>
  )
}

export default IconLink
