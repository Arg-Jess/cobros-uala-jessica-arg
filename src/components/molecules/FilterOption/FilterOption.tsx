import React, { JSX, ReactNode, useEffect, useState } from 'react'

interface FilterOptionProps {
  label: string
  icon: JSX.Element
  children?: ReactNode
  onToggle?: (active: boolean) => void
  resetSignal?: number
}

const FilterOption: React.FC<FilterOptionProps> = ({
  label,
  icon,
  children,
  onToggle,
  resetSignal,
}) => {
  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => {
    setIsActive(prev => {
      const newState = !prev
      onToggle?.(newState)
      return newState
    })
  }

  useEffect(() => {
    setIsActive(false)
  }, [resetSignal])

  return (
    <div className="flex flex-col mb-2">
      <div
        className={`flex items-center justify-between p-2 rounded-md cursor-pointer text-sm`}
        onClick={handleToggle}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-2">{label}</span>
        </div>

        <div
          className={`w-11 flex items-center rounded-full p-1 duration-300 ${
            isActive ? 'bg-primary-blue' : 'bg-neutral-grey'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
              isActive ? 'translate-x-5' : ''
            }`}
          ></div>
        </div>
      </div>

      {isActive && children && <div className="flex mt-2 ml-6">{children}</div>}
    </div>
  )
}

export default FilterOption
