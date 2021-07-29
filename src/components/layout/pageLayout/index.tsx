import { ReactNode } from 'react'
import Footer from '../footer'
import Nav from '../nav'
import PreFooter from '../preFooter'

type Props = {
  children: ReactNode
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
  withoutPreFooter = false
}: Props) => {
  return (
    <div>
      <Nav selected={navProps.selected} />
      {children}
      {!withoutPreFooter && <PreFooter />}
      <Footer />
    </div>
  )
}

export default PageLayout
