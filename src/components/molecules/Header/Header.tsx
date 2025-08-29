import HamburguerMenuIcon from '../../../assets/icons/HamburguerMenuIcon'
import Subtract from '../../../../public/assets/Subtract.svg'
import { Logo } from '../../atoms/Logo/Logo'
import React from 'react'

interface HeaderProps {
  openMenu: boolean
  setOpenMenu: (val: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ openMenu, setOpenMenu }) => (
  <header className=" flex px-4 h-[64px] w-full items-center justify-between bg-white border-b border-light-grey rounded-bl-[32px] z-50 md:hidden fixed top-0">
    <button className="text-2xl" onClick={() => setOpenMenu(!openMenu)}>
      <HamburguerMenuIcon />
    </button>
    <div className="mx-auto">
      <Logo />
    </div>
    <img
      src={Subtract}
      alt="Decorative element"
      className="absolute -bottom-8 right-0 w-8 h-8 pointer-events-none z-50"
    />
  </header>
)

export default Header
