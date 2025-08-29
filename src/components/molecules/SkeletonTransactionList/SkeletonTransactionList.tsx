export const SkeletonTransactionList: React.FC = () => {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 9 }).map((_, idx) => (
        <div
          key={idx}
          className="flex text-sm leading-[100%] py-1 px-2 justify-between animate-pulse"
        >
          <div className="flex gap-3 w-full">
            <div className="w-10 h-10 bg-light-grey rounded-[16px] flex-shrink-0" />

            <div className="h-10 bg-light-grey rounded-[16px] w-full md:w-[372px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
