import AmountIcon from '../assets/icons/AmountIcon'
import CalendarIcon from '../assets/icons/CalendarIcon'
import CardIcon from '../assets/icons/CardIcon'
import InstallmentsIcon from '../assets/icons/InstallmentsIcon'
import PaymentMethodIcon from '../assets/icons/PaymentMethodIcon'

export const FILTER_OPTIONS = [
  {
    label: 'Fecha',
    icon: <CalendarIcon />,
  },
  {
    label: 'Tarjeta',
    icon: <CardIcon />,
  },
  {
    label: 'Cuotas',
    icon: <InstallmentsIcon />,
  },
  {
    label: 'Monto',
    icon: <AmountIcon />,
  },
  {
    label: 'Métodos de cobro',
    icon: <PaymentMethodIcon />,
  },
]
