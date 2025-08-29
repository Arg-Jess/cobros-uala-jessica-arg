import React from 'react'
import { MdClose } from 'react-icons/md'

interface FilterChipsProps {
  options: { value: string; label: string }[]
  selected: { value: string; label: string }[]
  onChange: (option: { value: string; label: string }) => void
}

const FilterChips: React.FC<FilterChipsProps> = ({
  options,
  selected,
  onChange,
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map(option => {
        const isSelected = selected.some(sel => sel.value === option.value)

        return (
          <button
            key={option.value}
            className={`flex items-center gap-1 text-primary-blue text-[10px] font-normal px-3 py-2.5 border rounded-2xl border-primary-blue h-8 leading-[100%] tracking-[0%] cursor-pointer ${
              isSelected
                ? 'bg-lighter-blue text-primary-blue-dark font-semibold border-primary-blue-dark'
                : ''
            }`}
            onClick={() => onChange(option)}
          >
            <span>{option.label}</span>
            {isSelected && (
              <MdClose className="text-primary-blue-dark w-4 h-4" />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default React.memo(FilterChips)
