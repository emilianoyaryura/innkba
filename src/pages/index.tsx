import PageLayout from 'components/layout/pageLayout'
import { defaultMeta } from 'components/common/head'

const HomePage = () => {
  return (
    //   a domain for sale page
    <PageLayout
      withoutPreFooter
      headProps={{
        ...defaultMeta,
        title: 'innkba.com is for sale',
        description: 'Domain for sale - contact us'
      }}
    >
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center -mt-20 text-center">
          <p className="text-15 sm:text-18 text-gray-700">
            Domain for sale - jose@quaderno.app
          </p>
          <h1 className="text-32 sm:text-42 font-semibold mt-2">
            <u>innkba.com</u> is for sale
          </h1>
        </div>
      </div>
    </PageLayout>
  )
}

export default HomePage
