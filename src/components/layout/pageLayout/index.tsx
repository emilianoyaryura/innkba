import Head, { HeadProps } from 'components/common/head'
import { ReactNode } from 'react'
import { TinyPost } from 'ts/models'
import Footer from '../footer'
import Nav from '../nav'
import PreFooter from '../preFooter'

type Props = {
  children: ReactNode
  headProps: HeadProps
  withoutPreFooter?: boolean
  posts: TinyPost[]
}

const PageLayout = ({
  children,
  headProps,
  withoutPreFooter = false,
  posts
}: Props) => {
  return (
    <div>
      <Head headProps={headProps} />
      <Nav posts={posts} />
      {children}
      {!withoutPreFooter && <PreFooter />}
      <Footer />
    </div>
  )
}

export default PageLayout
