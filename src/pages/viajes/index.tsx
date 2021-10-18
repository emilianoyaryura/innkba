import PageLayout from 'components/layout/pageLayout'
import TravelHeader from 'components/sections/travel/header'
import { getPosts } from 'lib/api'
import { ContentfulPost } from 'ts/models'

const Viajes = ({ posts }: { posts: ContentfulPost[] }) => {
  return (
    <PageLayout posts={posts} headProps={{ title: 'Innk ba | Viajes' }}>
      <TravelHeader />
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()

  return {
    props: {
      posts: posts ?? null
    }
  }
}

export default Viajes
