import Quote from 'components/atoms/quote'
import PageLayout from 'components/layout/pageLayout'
import SectionLayout from 'components/layout/sectionLayout'
import PostGrid from 'components/molecules/postGrid'
import Story from 'components/molecules/story'
import HeaderPosts from 'components/sections/home/header-posts'
import { getHomePage, getPostsPreview } from 'lib/api'
import { getSectionSlug } from 'lib/utils/section'
import { ContentfulPost, Page } from 'ts/models'

const HomePage = ({
  contentfulPosts,
  page
}: {
  contentfulPosts: ContentfulPost[]
  page: Page
}) => {
  const tinyPosts = contentfulPosts.map((p) => {
    const section = getSectionSlug(p.category)
    return {
      title: p.title,
      href: `/${section}/${p.slug}`,
      category: p.category,
      tag: p.tag
    }
  })

  return (
    <PageLayout posts={tinyPosts} headProps={{ title: 'Innk ba' }}>
      <HeaderPosts
        principalPost={page.mainFeaturedPost ?? page.featuredPosts[0]}
        posts={page.featuredPosts.slice(0, 4)}
      />
      {page.weeklyQuote?.quote && (
        <Quote
          quote={page.weeklyQuote?.quote ?? ''}
          // @ts-ignore
          author={page.weeklyQuote?.author}
        />
      )}
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
  const posts = await getPostsPreview()
  const page = await getHomePage()

  return {
    props: {
      contentfulPosts: posts ?? null,
      page: page ?? null
    }
  }
}

export default HomePage
