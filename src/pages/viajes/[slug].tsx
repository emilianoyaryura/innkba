import { getTravelPosts } from 'lib/api'
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

export const getStaticProps = async () => {
  const posts = await getTravelPosts()

  return {
    props: {
      posts: posts ?? null
    }
  }
}

export default TravelPostPage
