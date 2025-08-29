import React from 'react'
import { AmountRange } from '../../../types/filterTypes'
import AmountRangeSlider from '../AmountRangeSlider/AmountRangeSlider'

interface FilterAmountProps {
  onChange: (range: AmountRange) => void
}

const FilterAmount: React.FC<FilterAmountProps> = ({ onChange }) => {
  return <AmountRangeSlider onChange={onChange} />
}

export default React.memo(FilterAmount)
