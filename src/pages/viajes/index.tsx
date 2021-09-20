import PageLayout from 'components/layout/pageLayout'
import TravelHeader from 'components/sections/travel/header'

const Viajes = () => {
  return (
    <PageLayout
      navProps={{ selected: 'viajes' }}
      headProps={{ title: 'Innk ba | Viajes' }}
    >
      <TravelHeader />
    </PageLayout>
  )
}

export default Viajes
