import PageLayout from 'components/layout/pageLayout'
import { getPosts } from 'lib/api'
import { ContentfulPost } from 'ts/models'

const Cultura = ({ posts }: { posts: ContentfulPost[] }) => {
  return (
    <PageLayout posts={posts} headProps={{ title: 'Innk ba | Cultura' }}>
      <div className="h-screen bg-red w-20 mt-6 mx-auto">aca</div>
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

export default Cultura
