import { useState, useMemo } from 'react'
import {
  parseISO,
  isWithinInterval,
  startOfDay,
  endOfDay,
  subDays,
  subMonths,
} from 'date-fns'
import IconLink from '../../atoms/IconLink/IconLink'
import ShowMetricsIcon from '../../../assets/icons/ShowMetricsIcon'
import { useContextTransactions } from '../../../context/TransactionsContext'
import { formattedWithSmallerDecimals } from '../../../utilities/numberFormat'

const SummaryTabs = () => {
  const {
    appState: { transactions, loadingTransactions },
  } = useContextTransactions()

  const tabs = ['Diario', 'Semanal', 'Mensual']
  const [activeIndex, setActiveIndex] = useState(1)

  const summaryFilter = useMemo(() => {
    switch (activeIndex) {
      case 0:
        return 'diario'
      case 1:
        return 'semanal'
      case 2:
        return 'mensual'
      default:
        return 'semanal'
    }
  }, [activeIndex])

  const filteredTransactions = useMemo(() => {
    if (!transactions) return []

    const today = new Date()
    let startDate: Date
    let endDate: Date = today

    switch (summaryFilter) {
      case 'diario':
        startDate = startOfDay(today)
        endDate = endOfDay(today)
        break
      case 'semanal':
        startDate = subDays(today, 7)
        break
      case 'mensual':
        startDate = subMonths(today, 1)
        break
      default:
        startDate = subDays(today, 7)
    }

    return transactions.filter(tx => {
      const txDate = parseISO(tx.createdAt)
      return isWithinInterval(txDate, { start: startDate, end: endDate })
    })
  }, [transactions, summaryFilter])

  const totalAmount = useMemo(() => {
    return filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0)
  }, [filteredTransactions])

  const { integer, decimal } = formattedWithSmallerDecimals(totalAmount)

  return (
    <div className="w-full md:w-[440px] flex flex-col  px-13 md:px-14 items-center box-border gap-4">
      {/* Tabs */}
      <h1 className="self-start text-dark-grey font-semibold text-base md:text-[22px] leading-[120%]">
        Tus cobros
      </h1>
      <div className="flex justify-between w-full">
        {tabs.map((title, index) => (
          <button
            key={title}
            data-testid={`tab-${title}`}
            className={` py-2 text-sm leading-[18px] text-primary-grey cursor-pointer ${
              index === activeIndex ? 'font-semibold' : 'font-thin'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="flex flex-col items-center gap-1">
              <span>{title}</span>
              {index === activeIndex && (
                <div className="w-2 h-2 bg-primary-blue rounded-full mt-1"></div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div
        data-testid="total-amount"
        className="text-[34px] font-extralight text-dark-grey text-center leading-[100%] tracking-[0%]"
      >
        {loadingTransactions ? (
          <div className="w-[207px] h-[40px] bg-light-grey rounded-[16px] animate-pulse mx-auto" />
        ) : (
          <>
            <span className="mr-1">+</span>
            <span className="mr-1">$</span>
            {integer}
            {decimal && (
              <span className="text-[22px] font-extralight text-dark-grey">
                ,{decimal}
              </span>
            )}
          </>
        )}
      </div>

      <IconLink
        icon={ShowMetricsIcon}
        to="/metrics"
        title="Ver métricas"
        defaultColor="text-primary-blue"
        activeColor="text-primary-blue"
        className="py-2 px-4 font-normal"
      />
    </div>
  )
}

export default SummaryTabs
