import ualaLogo from '../../../assets/images/ualaLogo.svg'
import wordmark from '../../../assets/images/wordmark.svg'

export const Logo = () => {
  return (
    <div className="flex gap-4">
      <img src={ualaLogo} alt="Uala Logo" className="hidden md:block" />
      <img src={wordmark} alt="Uala Mark" className="" />
    </div>
  )
}
