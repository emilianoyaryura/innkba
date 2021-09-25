import Head, { HeadProps } from 'components/common/head'
import { ReactNode } from 'react'
import Footer from '../footer'
import Nav from '../nav'
import PreFooter from '../preFooter'

type Props = {
  children: ReactNode
  headProps: HeadProps
  withoutPreFooter?: boolean
}

const PageLayout = ({
  children,
  headProps,
  withoutPreFooter = false
}: Props) => {
  return (
    <div>
      <Head {...headProps} />
      <Nav />
      {children}
      {!withoutPreFooter && <PreFooter />}
      <Footer />
    </div>
  )
}

export default PageLayout
