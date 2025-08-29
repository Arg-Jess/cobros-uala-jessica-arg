import { useState } from 'react'
import { DayPicker, DateRange, Locale } from 'react-day-picker'
import { es } from 'react-day-picker/locale'
import 'react-day-picker/style.css'
import CalendarIcon from '../../../assets/icons/CalendarIcon'

interface DateRangePickerProps {
  initialRange?: DateRange
  onChange?: (range: DateRange | undefined) => void
  className?: string
  title?: string
  footerButtons?: React.ReactNode
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  initialRange,
  onChange,
  className = '',
  title,
  footerButtons,
}) => {
  const [range, setRange] = useState<DateRange | undefined>(initialRange)

  const days = ['Dom', 'Lu', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab']

  const startOnSunday: Locale = {
    ...es,
    options: {
      ...es.options,
      weekStartsOn: 0,
    },
    localize: {
      ...es.localize,
      day: (n: number) => days[n],
    },
  }

  const handleSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange)
    if (onChange) onChange(selectedRange)
  }

  return (
    <div
      className={`p-4 ${className} rounded-[8px] bg-white max-w-[264px] mx-auto`}
      style={{ boxShadow: '0px 2px 24px 0px #55555514' }}
    >
      {title && (
        <div className="flex gap-3 items-center justify-center mb-2">
          <CalendarIcon className="w-8 h-8" />
          <h3 className="text-base font-medium text-dark-grey leading-[18px]">
            {title}
          </h3>
        </div>
      )}

      <DayPicker
        mode="range"
        selected={range}
        onSelect={handleSelect}
        navLayout="around"
        locale={startOnSunday}
        style={{
          ['--rdp-day-width' as any]: '32px',
          ['--rdp-day-height' as any]: '32px',
          ['--rdp-day_button-width' as any]: '32px',
          ['--rdp-day_button-height' as any]: '32px',
        }}
        classNames={{
          weekday: 'font-thin text-[12px] leading-[100%] h-[32px]',
          week: 'mb-4',
          caption_label:
            'capitalize text-sm text-secondary-grey font-semibold leading-[20px] mt-3',
          selected: 'bg-light-blue text-dark-grey text-xs',
          range_start: 'bg-primary-blue text-white rounded-l-[10px] text-xs',
          range_end: 'bg-primary-blue text-white rounded-r-[10px] text-xs',
          range_middle: 'bg-light-blue text-dark-grey text-xs',
          today: 'bg-gray-100',
          chevron: 'fill-primary-blue',
        }}
        className="text-xs"
      />

      {footerButtons && <div className="mt-4 flex gap-2">{footerButtons}</div>}
    </div>
  )
}
