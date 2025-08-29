import IconLink from '../../atoms/IconLink/IconLink'
import HouseIcon from '../../../assets/icons/HouseIcon'
import MetricsIcon from '../../../assets/icons/MetricsIcon'
import { Logo } from '../../atoms/Logo/Logo'
import DownloadApp from '../../organisms/DownloadApp/DownloadApp'

interface SidebarProps {
  openMenu?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ openMenu }) => {
  return (
    <nav className="flex flex-col w-full text-white p-4 min-h-screen fixed hidden md:flex md:w-1/4">
      <div className="flex flex-col">
        {!openMenu && (
          <div className="px-4 pt-6 pb-8">
            <Logo />
          </div>
        )}

        <IconLink
          icon={HouseIcon}
          to="/"
          title="Inicio"
          defaultColor="text-secondary-grey"
          activeColor="text-secondary-blue"
          className="px-4 py-3"
        />
        <IconLink
          icon={MetricsIcon}
          to="/metrics"
          title="Métricas"
          defaultColor="text-gray-500"
          activeColor="text-blue-500"
          className="px-4 py-3"
        />
      </div>

      <DownloadApp />
    </nav>
  )
}

export default Sidebar
