import { DateRange } from 'react-day-picker'
import { DateRangePicker } from '../DateRangePicker/DateRangePicker'
import Button from '../../atoms/Button/Button'
import React, { useState } from 'react'

interface FilterDateProps {
  onChange: (range: DateRange | undefined) => void
}

const FilterDate: React.FC<FilterDateProps> = ({ onChange }) => {
  return (
    <DateRangePicker
      onChange={onChange}
      footerButtons={
        <Button
          variant="outline"
          color="primary-blue"
          px="4"
          py="1"
          className="ml-auto font-extralight"
        >
          <span>Borrar</span>
        </Button>
      }
    />
  )
}

export default React.memo(FilterDate)
