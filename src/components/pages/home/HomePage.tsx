import UserHeader from '../../molecules/UserHeader/UserHeader'
import UserPhoto from '../../../assets/images/UserPhoto.svg'
import SummaryTabs from '../../molecules/SummaryTabs/SummaryTabs'
import Sidebar from '../../molecules/Sidebar/Sidebar'
import { useState } from 'react'
import { useContextTransactions } from '../../../context/TransactionsContext'
import NavBar from '../../molecules/NavBar/NavBar'
import PaymentsSection from '../../organisms/PaymentsSection/PaymentsSection'

const HomePage: React.FC = () => {
  const userData = {
    name: 'Jessica',
    image: UserPhoto,
  }

  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const {
    appState: { isSidePanelOpen },
  } = useContextTransactions()

  return (
    <div className="flex flex-col h-screen w-screen">
      {/* NavBar mobile */}
      <NavBar setOpenMenu={setOpenMenu} openMenu={openMenu} />

      {/* SideBar desktop */}
      <Sidebar />

      <main
        className={`flex-1 flex flex-col ml-0 md:ml-[25%] ${isSidePanelOpen ? 'overflow-hidden' : ''}`}
      >
        <UserHeader name={userData.name} imageUrl={userData.image} />
        <div className="flex-1 bg-light-white flex flex-col items-center pt-8 gap-6 ">
          <SummaryTabs />
          <PaymentsSection />
        </div>
      </main>
    </div>
  )
}

export default HomePage
