import Head, { HeadProps } from 'components/common/head'
import { ReactNode } from 'react'
import Footer from '../footer'
import Nav from '../nav'
import PreFooter from '../preFooter'

type Props = {
  children: ReactNode
  headProps: HeadProps
  navProps: {
    selected:
      | 'lifestyle'
      | 'viajes'
      | 'cultura'
      | 'arte'
      | 'literatura'
      | 'inicio'
  }
  withoutPreFooter?: boolean
}

const PageLayout = ({
  children,
  navProps,
  headProps,
  withoutPreFooter = false
}: Props) => {
  return (
    <div>
      <Head {...headProps} />
      <Nav selected={navProps.selected} />
      {children}
      {!withoutPreFooter && <PreFooter />}
      <Footer />
    </div>
  )
}

export default PageLayout
