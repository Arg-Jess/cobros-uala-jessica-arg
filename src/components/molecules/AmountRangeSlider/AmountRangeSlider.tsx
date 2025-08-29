import React, { useState } from 'react'
import { AmountRange } from '../../../types/filterTypes'
import { AmountBox } from '../../atoms/AmountBox/AmountBox'

interface AmountRangeSliderProps {
  onChange: (range: AmountRange) => void
}

const AmountRangeSlider: React.FC<AmountRangeSliderProps> = ({ onChange }) => {
  const MIN_VALUE = 0
  const MAX_VALUE = 2000

  const [maxValue, setMaxValue] = useState<number>(MIN_VALUE)

  const handleChange = (val: number) => {
    const newMax = Math.max(MIN_VALUE, Math.min(val, MAX_VALUE))
    setMaxValue(newMax)
    onChange({ min: MIN_VALUE, max: newMax })
  }

  return (
    <div className="flex flex-col gap-4 w-[320px] mx-auto">
      <input
        type="range"
        min={MIN_VALUE}
        max={MAX_VALUE}
        value={maxValue}
        onChange={e => handleChange(Number(e.target.value))}
        className="w-full accent-primary-blue custom-range"
      />

      <div className="flex justify-between gap-2">
        <AmountBox label="Monto mínimo" value={MIN_VALUE} />
        <AmountBox label="Monto máximo" value={maxValue} />
      </div>
    </div>
  )
}

export default React.memo(AmountRangeSlider)
