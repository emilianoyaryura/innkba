import PageLayout from 'components/layout/pageLayout'

const Viajes = () => {
  return (
    <PageLayout
      navProps={{ selected: 'viajes' }}
      headProps={{ title: 'Innk ba | Viajes' }}
    >
      <div className="h-screen bg-red w-20 mt-6 mx-auto">aca</div>
    </PageLayout>
  )
}

export default Viajes
