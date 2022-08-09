import {
  getAllStories,
  getArtandLiteraturePosts,
  getPostsPreview
} from 'lib/api'
import LiteraturePostPage from 'pages/template'
import { Story } from 'ts/models'

export const getStaticPaths = async () => {
  const posts = await getArtandLiteraturePosts()
  const stories = await getAllStories()
  const allPaths = posts
    .map((p) => p?.slug)
    .concat(stories.map((s: Story) => s.slug))
  const paths = allPaths.map((each: any) => ({
    params: { slug: each as string }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async () => {
  const posts = await getPostsPreview()
  const stories = await getAllStories()

  return {
    props: {
      posts: posts ?? null,
      stories: stories ?? null
    }
  }
}

export default LiteraturePostPage
