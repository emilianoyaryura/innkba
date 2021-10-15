import { getLiteraturePosts } from 'lib/api'
import LiteraturePostPage from 'pages/template'

export const getStaticPaths = async () => {
  const posts = await getLiteraturePosts()
  const paths = posts.map((each: any) => ({
    params: { slug: each.slug as string }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async () => {
  const posts = await getLiteraturePosts()

  return {
    props: {
      posts: posts ?? null
    }
  }
}

export default LiteraturePostPage
