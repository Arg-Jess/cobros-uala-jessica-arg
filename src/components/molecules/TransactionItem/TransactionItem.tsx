import StoreIcon from '../../../assets/icons/StoreIcon'
import { useContextTransactions } from '../../../context/TransactionsContext'
import { Transaction } from '../../../types'
import { format, parseISO } from 'date-fns'
import { PaymentMethod } from '../../../types/paymentMethod'
import { formattedWithDecimals } from '../../../utilities/numberFormat'

interface TransactionItemProps {
  transaction: Transaction
  paymentMethods: PaymentMethod[]
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  paymentMethods,
}) => {
  const paymentMethodLabel =
    paymentMethods.find(
      paymentMethod => paymentMethod.value === transaction.paymentMethod,
    )?.label ?? 'Desconocido'

  return (
    <div className="flex text-sm leading-[100%] py-3 px-2 justify-between border-b border-light-grey">
      <div className="flex gap-2">
        <StoreIcon className="w-8 h-8 text-primary-green" />
        <div className="flex flex-col gap-1">
          <p className="text-dark-grey font-semibold text-[14px] leading-[100%] ">
            {paymentMethodLabel}
          </p>
          <p className="text-[14px] font-extralight leading-[100%] tracking-[0.02em] text-neutral-grey align-middle">
            Venta
          </p>
        </div>
      </div>

      <div className="flex flex-col text-righ gap-1 text-right">
        <p className="text-primary-green font-semibold">
          {`+$${formattedWithDecimals(transaction.amount)}`}
        </p>
        <p className="text-neutral-grey font-thin text-[14px] leading-[100%] tracking-[0.02em]">
          {format(parseISO(transaction.createdAt), 'dd/MM/yyyy')}
        </p>
      </div>
    </div>
  )
}
