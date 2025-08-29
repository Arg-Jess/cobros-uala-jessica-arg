import SummaryTabs from '../../molecules/SummaryTabs/SummaryTabs'

import PaymentsSection from '../../organisms/PaymentsSection/PaymentsSection'

const HomePage: React.FC = () => {
  return (
    <div className="flex-1 bg-light-white flex flex-col items-center mt-[64px] md:mt-0 pt-6 min-h-0">
      <SummaryTabs />
      <div className="flex-1 w-full flex flex-col min-h-0 md:w-auto">
        <PaymentsSection />
      </div>
    </div>
  )
}

export default HomePage
