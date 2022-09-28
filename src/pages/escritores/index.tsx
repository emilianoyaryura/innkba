import HomePage from 'pages'
import { getAllAuthors, getHomePage, getPostsPreview } from 'lib/api'

export const getStaticProps = async () => {
  const posts = await getPostsPreview()
  const page = await getHomePage()
  const authors = await getAllAuthors()

  return {
    props: {
      contentfulPosts: posts ?? null,
      page: page ?? null,
      authors: authors ?? null
    }
  }
}

export default HomePage
