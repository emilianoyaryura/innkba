import {
  getAllAuthors,
  getLifestylePosts,
  getPost,
  getPostsPreview
} from 'lib/api'
import LifestylePostPage from 'pages/template'

export const getStaticPaths = async () => {
  const posts = await getLifestylePosts()
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

export default LifestylePostPage
