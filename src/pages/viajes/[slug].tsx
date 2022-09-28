import {
  getAllAuthors,
  getPost,
  getPostsPreview,
  getTravelPosts
} from 'lib/api'
import TravelPostPage from 'pages/template'

export const getStaticPaths = async () => {
  const posts = await getTravelPosts()
  const paths = posts.map((each: any) => ({
    params: { slug: each.slug as string }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }: { params: any }) => {
  const { slug } = params

  const post = await getPost(slug)
  const posts = await getPostsPreview()
  const authors = await getAllAuthors()

  return {
    props: {
      post: post ?? null,
      posts: posts ?? null,
      authors: authors ?? null
    }
  }
}

export default TravelPostPage
