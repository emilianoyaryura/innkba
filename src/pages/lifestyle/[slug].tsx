import { getLifestylePosts, getPosts } from 'lib/api'
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

export const getStaticProps = async () => {
  const posts = await getPosts()

  return {
    props: {
      posts: posts ?? null
    }
  }
}

export default LifestylePostPage
