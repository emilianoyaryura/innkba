import { getCulturePosts } from 'lib/api'
import CulturePostPage from '../template'

export const getStaticPaths = async () => {
  const posts = await getCulturePosts()
  const paths = posts.map((each: any) => ({
    params: { slug: each.slug as string }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async () => {
  const posts = await getCulturePosts()

  return {
    props: {
      posts: posts ?? null
    }
  }
}

export default CulturePostPage
