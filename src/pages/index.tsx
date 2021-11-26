import Quote from 'components/atoms/quote'
import PageLayout from 'components/layout/pageLayout'
import SectionLayout from 'components/layout/sectionLayout'
import PostGrid from 'components/molecules/postGrid'
import Story from 'components/molecules/story'
import HeaderPosts from 'components/sections/home/header-posts'
import { getHomePage, getPosts } from 'lib/api'
import { ContentfulPost, Page } from 'ts/models'

const HomePage = ({
  contentfulPosts,
  page
}: {
  contentfulPosts: ContentfulPost[]
  page: Page
}) => {
  return (
    <PageLayout posts={contentfulPosts} headProps={{ title: 'Innk ba' }}>
      <HeaderPosts
        principalPost={page.mainFeaturedPost ?? page.featuredPosts[0]}
        posts={page.featuredPosts.slice(0, 4)}
      />
      <Quote
        quote={page.weeklyQuote?.quote ?? ''}
        // @ts-ignore
        author={page.weeklyQuote?.author}
      />
      <SectionLayout title="Recomendado">
        <PostGrid id="recomendado" posts={page.featuredPosts.slice(4, 20)} />
      </SectionLayout>
      <Story story={page.story} />
      <SectionLayout title="Lo más nuevo">
        <PostGrid
          id="loMasNuevo"
          posts={contentfulPosts.filter(
            (post) =>
              !page.featuredPosts.some((nd) => post.title === nd.title) &&
              post.title !== page.mainFeaturedPost?.title
          )}
        />
      </SectionLayout>
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()
  const page = await getHomePage()

  return {
    props: {
      contentfulPosts: posts ?? null,
      page: page ?? null
    }
  }
}

export default HomePage
