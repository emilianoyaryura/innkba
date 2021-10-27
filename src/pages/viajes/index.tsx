import PageLayout from 'components/layout/pageLayout'
import TravelHeader from 'components/sections/travel/header'
import { getPosts, getTravelPage } from 'lib/api'
import { ContentfulPost, Page } from 'ts/models'

const Viajes = ({ posts, page }: { posts: ContentfulPost[]; page: Page }) => {
  console.log(page)
  return (
    <PageLayout posts={posts} headProps={{ title: 'Innk ba | Viajes' }}>
      <TravelHeader />
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()
  const page = await getTravelPage()

  return {
    props: {
      posts: posts ?? null,
      page: page ?? null
    }
  }
}

export default Viajes
