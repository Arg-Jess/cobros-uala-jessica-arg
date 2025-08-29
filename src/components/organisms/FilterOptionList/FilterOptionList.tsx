import { DateRange } from 'react-day-picker'
import { INSTALLMENTS_OPTIONS_OBJ } from '../../../constants/installments'
import { FilterState } from '../../../types'
import FilterAmount from '../../molecules/FilterAmount/FilterAmount'
import FilterChips from '../../molecules/FilterChips/FilterChips'
import FilterDate from '../../molecules/FilterDate/FilterDate'
import FilterOption from '../../molecules/FilterOption/FilterOption'
import { AmountRange } from '../../../types/filterTypes'
import { FilterOptionConfig, Option } from '../../../types/Option'

interface FilterOptionsListProps {
  options: FilterOptionConfig[]
  tempFilters: FilterState
  setTempFilters: (tempFilters: FilterState) => void
  resetSignal: number
  clearFilterByLabel: (label: string) => void
  handleDateChange: (range: DateRange | undefined) => void
  handleAmountChange: (range: AmountRange) => void
  handleChipToggle: (
    option: Option,
    selectedItems: Option[],
    setSelected: (items: Option[]) => void,
  ) => void
  paymentMethods: Option[]
  cards: Option[]
}

const FilterOptionsList: React.FC<FilterOptionsListProps> = ({
  options,
  tempFilters,
  setTempFilters,
  resetSignal,
  clearFilterByLabel,
  handleDateChange,
  handleAmountChange,
  handleChipToggle,
  paymentMethods,
  cards,
}) => {
  const renderFilterContent = (option: FilterOptionConfig) => {
    switch (option.label) {
      case 'Fecha':
        return <FilterDate onChange={handleDateChange} />

      case 'Tarjeta':
        return (
          <FilterChips
            options={[{ value: 'all', label: 'Todas' }, ...cards]}
            selected={tempFilters.cards || []}
            onChange={selectedOption => {
              if (selectedOption.value === 'all') {
                setTempFilters({
                  ...tempFilters,
                  cards: [{ value: 'all', label: 'Todas' }],
                })
              } else {
                const withoutAll = (tempFilters.cards || []).filter(
                  c => c.value !== 'all',
                )
                handleChipToggle(selectedOption, withoutAll, updated =>
                  setTempFilters({ ...tempFilters, cards: updated }),
                )
              }
            }}
          />
        )

      case 'Cuotas':
        return (
          <FilterChips
            options={[
              { value: 'all', label: 'Todas' },
              ...INSTALLMENTS_OPTIONS_OBJ,
            ]}
            selected={tempFilters.installments || []}
            onChange={selectedOption => {
              if (selectedOption.value === 'all') {
                setTempFilters({
                  ...tempFilters,
                  installments: [{ value: 'all', label: 'Todas' }],
                })
              } else {
                const withoutAll = (tempFilters.installments || []).filter(
                  i => i.value !== 'all',
                )
                handleChipToggle(selectedOption, withoutAll, updated =>
                  setTempFilters({ ...tempFilters, installments: updated }),
                )
              }
            }}
          />
        )

      case 'Monto':
        return <FilterAmount onChange={handleAmountChange} />

      case 'Métodos de cobro':
        return (
          <FilterChips
            options={paymentMethods}
            selected={tempFilters.paymentMethods || []}
            onChange={selectedOption =>
              handleChipToggle(
                selectedOption,
                tempFilters.paymentMethods || [],
                updated =>
                  setTempFilters({ ...tempFilters, paymentMethods: updated }),
              )
            }
          />
        )

      default:
        return null
    }
  }

  return (
    <>
      {options.map(option => (
        <FilterOption
          key={option.label}
          label={option.label}
          icon={option.icon}
          resetSignal={resetSignal}
          onToggle={active => {
            if (!active) clearFilterByLabel(option.label)
          }}
        >
          {renderFilterContent(option)}
        </FilterOption>
      ))}
    </>
  )
}

export default FilterOptionsList
