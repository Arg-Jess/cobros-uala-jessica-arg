interface AmountBoxProps {
  label: string
  value: number
}

export const AmountBox: React.FC<AmountBoxProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col border border-primary-blue rounded-lg px-3 w-[100px]">
      <span className="text-[10px] text-neutral-grey font-extralight">
        {label}
      </span>
      <span className="text-[14px]">${value}</span>
    </div>
  )
}
