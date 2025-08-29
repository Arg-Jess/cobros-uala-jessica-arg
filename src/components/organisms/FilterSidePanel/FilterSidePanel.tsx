import React, { useState } from 'react'
import { useContextTransactions } from '../../../context/TransactionsContext'
import { FILTER_OPTIONS } from '../../../constants/filterOptions'
import Button from '../../atoms/Button/Button'
import { DateRange } from 'react-day-picker'
import { AmountRange } from '../../../types/filterTypes'
import { FilterState } from '../../../types'
import { hasActiveFilters } from '../../../utilities/hasActiveFilters'
import PreviousIcon from '../../../assets/icons/PreviousIcon'
import FilterOptionsList from '../FilterOptionList/FilterOptionList'

const FilterSidePanel: React.FC = () => {
  const {
    appState: { isSidePanelOpen, cards, paymentMethods },
    togglePanel,
    resetFilter,
    setFilter,
  } = useContextTransactions()

  const [resetSignal, setResetSignal] = useState(0)

  const initialTempFilters = {
    dateRange: { from: null, to: null },
    cards: [],
    installments: [],
    amountRange: { min: null, max: null },
    paymentMethods: [],
  }

  const [tempFilters, setTempFilters] =
    useState<FilterState>(initialTempFilters)

  const handleResetFilters = () => {
    setTempFilters(initialTempFilters)
    setResetSignal(prev => prev + 1)
  }

  const handleDateChange = (range: DateRange | undefined) => {
    setTempFilters({
      ...tempFilters,
      dateRange: range
        ? {
            from: range.from ?? null,
            to: range.to ?? null,
          }
        : undefined,
    })
  }

  const handleAmountChange = (range: AmountRange | undefined) => {
    setTempFilters({ ...tempFilters, amountRange: range })
  }

  const handleChipToggle = <T extends { value: string; label: string }>(
    option: T,
    selectedItems: T[] = [],
    setSelected: (items: T[]) => void,
  ) => {
    const isSelected = selectedItems.some(item => item.value === option.value)

    const updated = isSelected
      ? selectedItems.filter(item => item.value !== option.value)
      : [...selectedItems, option]

    setSelected(updated)
  }

  const handleApplyFilter = () => {
    setFilter(tempFilters)
    togglePanel(false)
  }

  const clearFilterByLabel = (label: string) => {
    switch (label) {
      case 'Fecha':
        setTempFilters(prev => ({ ...prev, dateRange: undefined }))
        break
      case 'Tarjeta':
        setTempFilters(prev => ({ ...prev, cards: [] }))
        break
      case 'Cuotas':
        setTempFilters(prev => ({ ...prev, installments: [] }))
        break
      case 'Monto':
        setTempFilters(prev => ({ ...prev, amountRange: undefined }))
        break
      case 'Métodos de cobro':
        setTempFilters(prev => ({ ...prev, paymentMethods: [] }))
        break
    }
  }

  return (
    <div
      className={`fixed top-0 right-0 h-[calc(100vh-64px)] bg-light-white shadow-lg transition-transform transform w-full md:w-[38%] ${
        isSidePanelOpen ? 'translate-x-0' : 'translate-x-full'
      } z-40 overflow-y-auto top-[64px] md:top-0 md:h-full`}
    >
      <div className="flex flex-col h-[calc(100vh-64px)] pt-10 pr-6 pl-6 text-secondary-grey md:h-full md:pt-10 md:pr-10 md:pl-10">
        <button
          onClick={() => togglePanel(false)}
          className="flex items-center justify-start mb-13 gap-4 cursor-pointer"
          aria-label="Cerrar panel de filtros"
        >
          <PreviousIcon className="h-4 text-primary-blue mr-2 cursor-pointer" />
          <span className="text-base">Filtros</span>
        </button>
        <div className="flex flex-col">
          <div className="flex justify-between text-base mb-5 ">
            <p>Todos los filtros</p>

            <button
              onClick={handleResetFilters}
              disabled={!hasActiveFilters(tempFilters)}
              className={` ${hasActiveFilters(tempFilters) ? 'text-primary-blue cursor-pointer' : 'text-semi-grey '}   `}
            >
              Limpiar
            </button>
          </div>
          <FilterOptionsList
            options={FILTER_OPTIONS}
            tempFilters={tempFilters}
            setTempFilters={setTempFilters}
            resetSignal={resetSignal}
            clearFilterByLabel={clearFilterByLabel}
            handleDateChange={handleDateChange}
            handleAmountChange={handleAmountChange}
            handleChipToggle={handleChipToggle}
            paymentMethods={paymentMethods}
            cards={cards}
          />
        </div>
        <Button
          variant="filled"
          color="primary-blue"
          className="mt-auto mb-3"
          disabled={!hasActiveFilters(tempFilters)}
          onClick={handleApplyFilter}
        >
          <span className="font-thin">Aplicar filtros</span>
        </Button>
      </div>
    </div>
  )
}

export default FilterSidePanel
