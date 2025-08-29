import DownloadIcon from '../../../assets/icons/DownloadIcon'
import FilterIcon from '../../../assets/icons/FilterIcon'
import { TransactionItem } from '../../molecules/TransactionItem/TransactionItem'
import { useMemo, useState } from 'react'
import { useContextTransactions } from '../../../context/TransactionsContext'
import FilterSidePanel from '../FilterSidePanel/FilterSidePanel'
import { filterTransactions } from '../../../utilities/filterTransactions'
import { SkeletonTransactionList } from '../../molecules/SkeletonTransactionList/SkeletonTransactionList'
import InfoCard from '../../molecules/InfoCard/InfoCard'
import EmptySearch from '../../../assets/images/empty-search.svg'
import { DateRangePicker } from '../../molecules/DateRangePicker/DateRangePicker'
import Button from '../../atoms/Button/Button'
import { DateRange } from 'react-day-picker'
import { downloadCSV } from '../../../utilities/downloadCSV'
import { InformativeAlert } from '../../molecules/InformativeAlert/InformativeAlert'

const PaymentsSection = () => {
  const {
    appState: {
      transactions,
      loadingTransactions,
      isSidePanelOpen,
      paymentMethods,
      filters,
    },
    togglePanel,
  } = useContextTransactions()

  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  const [selectedRangeToDownload, SetSelectedRangeToDownload] = useState<
    DateRange | undefined
  >()
  const [showInformativeAlert, setShowInformativeAlert] =
    useState<boolean>(false)

  const transactionItems = useMemo(() => {
    if (!transactions.length)
      return [
        <InfoCard
          key="no-transactions"
          imageSrc={EmptySearch}
          alt="empty-search"
          description="No hay resultados que mostrar. Podés probar usando los filtros."
        />,
      ]

    const filtered = filterTransactions(transactions, filters)

    if (!filtered.length)
      return <p>No hay transacciones para los filtros seleccionados</p>

    return filtered.map(t => (
      <TransactionItem
        key={t.id}
        transaction={t}
        paymentMethods={paymentMethods}
      />
    ))
  }, [transactions, filters, paymentMethods])

  const handleTogglePanel = () => {
    togglePanel(true)
  }

  const handleDownload = () => {
    const filteredTransactionsToDownload = transactions.filter(tx => {
      if (!selectedRangeToDownload?.from || !selectedRangeToDownload?.to)
        return true
      const txDate = new Date(tx.createdAt)
      return (
        txDate >= selectedRangeToDownload.from &&
        txDate <= selectedRangeToDownload.to
      )
    })

    if (!filteredTransactionsToDownload.length) {
      setShowInformativeAlert(true)
      setTimeout(() => setShowInformativeAlert(false), 3000)
      setOpenCalendar(false)
      return
    }

    downloadCSV(filteredTransactionsToDownload)
  }

  return (
    <>
      <div className="flex flex-col w-full md:w-[440px] gap-2 relative px-4 md:px-0">
        <div className="flex items-center justify-between ">
          <h3 className="ml-2 text-sm font-semibold text-dark-grey">
            Historial de transacciones
          </h3>
          <div className="flex">
            <button
              onClick={handleTogglePanel}
              aria-label="Abrir panel de filtros"
            >
              <FilterIcon className="text-primary-blue w-6 h-6  m-3 cursor-pointer" />{' '}
            </button>
            <button
              onClick={() => setOpenCalendar(!openCalendar)}
              aria-label="Abrir calendario de descarga"
            >
              <DownloadIcon className="text-primary-blue w-6 h-6 m-3 cursor-pointer" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {loadingTransactions ? <SkeletonTransactionList /> : transactionItems}
        </div>

        {isSidePanelOpen && (
          <div
            className="fixed inset-0 bg-white z-40"
            style={{ opacity: 0.8 }}
          />
        )}
        <FilterSidePanel />
        {openCalendar && (
          <DateRangePicker
            title="Elegí las fechas que querés descargar"
            onChange={SetSelectedRangeToDownload}
            className="absolute top-13 left-1/2 -translate-x-1/2"
            footerButtons={
              <div className="flex gap-2 mx-auto">
                <Button
                  variant="outline"
                  color="primary-blue"
                  px="4"
                  py="1"
                  className="ml-auto font-extralight"
                  onClick={() => setOpenCalendar(false)}
                >
                  <span>Cerrar</span>
                </Button>
                <Button
                  variant="filled"
                  color="primary-blue"
                  px="4"
                  py="1"
                  className="ml-auto font-extralight"
                  onClick={handleDownload}
                >
                  <span>Descargar</span>
                </Button>
              </div>
            }
          />
        )}
      </div>
      {showInformativeAlert && (
        <InformativeAlert
          description="No hay movimientos en las fechas seleccionadas para descargar"
          className="absolute bottom-5 mx-4 md:right-10"
        />
      )}
    </>
  )
}

export default PaymentsSection
