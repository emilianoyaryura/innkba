import PageLayout from 'components/layout/pageLayout'
import { getPosts } from 'lib/api'
import { ContentfulPost } from 'ts/models'

const Literatura = ({ posts }: { posts: ContentfulPost[] }) => {
  return (
    <PageLayout posts={posts} headProps={{ title: 'Innk ba | Literatura' }}>
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

export default Literatura
