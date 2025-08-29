import React from 'react'

interface InformativeAlertProps {
  description: string
  className?: string
}

export const InformativeAlert: React.FC<InformativeAlertProps> = ({
  description,
  className,
}) => {
  return (
    <div className={` ${className}`}>
      <p className="text-white bg-primary-blue-dark text-base font-thin leading-[140%] px-6 py-2 rounded">
        {description}
      </p>
    </div>
  )
}
