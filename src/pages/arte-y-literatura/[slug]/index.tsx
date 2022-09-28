import {
  getAllAuthors,
  getAllStories,
  getArtandLiteraturePosts,
  getPost,
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

export const getStaticProps = async ({ params }: { params: any }) => {
  const { slug } = params

  const posts = await getPostsPreview()
  const post = await getPost(slug)
  const stories = await getAllStories()
  const authors = await getAllAuthors()

  return {
    props: {
      post: post ?? null,
      posts: posts ?? null,
      stories: stories ?? null,
      authors: authors ?? null
    }
  }
}

export default LiteraturePostPage
