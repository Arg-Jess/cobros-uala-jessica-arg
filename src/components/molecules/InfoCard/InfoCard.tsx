import React from 'react'

type InfoCardProps = {
  imageSrc: string
  alt?: string
  description: string
  className?: string
}

const InfoCard: React.FC<InfoCardProps> = ({
  imageSrc,
  alt = '',
  description,
  className,
}) => {
  return (
    <div
      className={`flex flex-col items-center text-center gap-4 p-4  w-80 mx-auto ${className}`}
    >
      <img src={imageSrc} alt={alt} className="object-contain" />
      <p className="text-sm text-neutral-grey font-thin">{description}</p>
    </div>
  )
}

export default InfoCard
