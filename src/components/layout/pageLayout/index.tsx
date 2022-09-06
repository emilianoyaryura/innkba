import Head, { defaultMeta, HeadProps } from 'components/common/head'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { TinyPost } from 'ts/models'
import Footer from '../footer'
import Nav from '../nav'
import PreFooter from '../preFooter'

type Props = {
  children: ReactNode
  headProps?: HeadProps
  withoutPreFooter?: boolean
  posts: TinyPost[]
}

const PageLayout = ({
  children,
  headProps,
  withoutPreFooter = false,
  posts
}: Props) => {
  const router = useRouter()

  return (
    <div>
      <Head
        headProps={{
          title: headProps?.title ?? defaultMeta.title,
          description: headProps?.description ?? defaultMeta.description,
          ogImage: headProps?.ogImage ?? defaultMeta.title,
          cannonical: `https://www.innkba.com${router.asPath}`
        }}
      />
      <Nav posts={posts} />
      {children}
      {!withoutPreFooter && <PreFooter />}
      <Footer />
    </div>
  )
}

export default PageLayout
