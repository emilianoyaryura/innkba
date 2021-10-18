import Head, { HeadProps } from 'components/common/head'
import { ReactNode } from 'react'
import { ContentfulPost } from 'ts/models'
import Footer from '../footer'
import Nav from '../nav'
import PreFooter from '../preFooter'

type Props = {
  children: ReactNode
  headProps: HeadProps
  withoutPreFooter?: boolean
  posts: ContentfulPost[]
}

const PageLayout = ({
  children,
  headProps,
  withoutPreFooter = false,
  posts
}: Props) => {
  return (
    <div>
      <Head {...headProps} />
      <Nav posts={posts} />
      {children}
      {!withoutPreFooter && <PreFooter />}
      <Footer />
    </div>
  )
}

export default PageLayout
