import React from 'react'
import AppleIcon from '../../../../src/assets/images/AppleStore.svg'
import GoogleIcon from '../../../../src/assets/images/GoogleStore.svg'

const DownloadApp: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-auto mb-3">
      <h2 className="text-secondary-grey font-semibold text-[18px] leading-[24px] tracking-[0px] text-center">
        Descargá la app desde
      </h2>

      <div className="flex flex-col gap-4">
        <a href="#" className="cursor-pointer">
          <img src={AppleIcon} alt="Download on the App Store" />
        </a>
        <a href="#" className="cursor-pointer">
          <img src={GoogleIcon} alt="Download on Google Play" />
        </a>
      </div>
    </div>
  )
}

export default DownloadApp
