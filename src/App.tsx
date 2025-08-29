import React, { useEffect, useState } from 'react'
import AppRoutes from './AppRoutes'
import { useContextTransactions } from './context/TransactionsContext'
import { useGetTransactions } from './services/useTransactions'
import Sidebar from './components/molecules/Sidebar/Sidebar'
import UserPhoto from '../src/assets/images/UserPhoto.svg'
import Header from './components/molecules/Header/Header'
import UserHeader from './components/molecules/UserHeader/UserHeader'

const App: React.FC = () => {
  const { data, isLoading, isError, error } = useGetTransactions()
  const {
    setTransactionData,
    setCards,
    setPaymentMethods,
    setLoadingTransactions,
    setError,
  } = useContextTransactions()

  const userData = {
    name: 'Jessica',
    image: UserPhoto,
  }

  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const {
    appState: { isSidePanelOpen },
  } = useContextTransactions()

  useEffect(() => {
    setLoadingTransactions(isLoading)
  }, [isLoading])

  useEffect(() => {
    if (data) {
      const allTx = Object.values(data.transactions).flat()

      setTransactionData(allTx)
      setCards(data.metadata.cards)
      setPaymentMethods(data.metadata.paymentMethods)
    }
  }, [data])

  return (
    <div className="flex flex-col h-screen w-screen overflow-x-hidden">
      {/* Header mobile */}
      <Header setOpenMenu={setOpenMenu} openMenu={openMenu} />

      {/* SideBar desktop */}
      <Sidebar />

      <main
        className={`flex-1 flex flex-col h-screen ml-0 md:ml-[25%] ${isSidePanelOpen ? 'overflow-hidden' : ''}`}
      >
        <UserHeader name={userData.name} imageUrl={userData.image} />

        <AppRoutes />
      </main>
    </div>
  )
}

export default App
