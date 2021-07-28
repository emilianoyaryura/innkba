import { ReactNode } from 'react'
import Nav from '../nav'

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
}

const PageLayout = ({ children, navProps }: Props) => {
  return (
    <div>
      <Nav selected={navProps.selected} />
      {children}
    </div>
  )
}

export default PageLayout
