import HamburguerMenuIcon from '../../../assets/icons/HamburguerMenuIcon'
import Subtract from '../../../../public/assets/Subtract.svg'
import { Logo } from '../../atoms/Logo/Logo'

const NavBar = ({ setOpenMenu, openMenu }: any) => (
  <header className="relative flex px-4 min-h-[64px] items-center justify-between bg-white border-b border-light-grey rounded-bl-[32px] z-50 md:hidden">
    <button className="text-2xl" onClick={() => setOpenMenu(!openMenu)}>
      <HamburguerMenuIcon />
    </button>
    <div className="mx-auto">
      <Logo />
    </div>
    <img
      src={Subtract}
      alt=""
      className="absolute -bottom-8 right-0 w-8 h-8 pointer-events-none z-50"
    />
  </header>
)

export default NavBar
