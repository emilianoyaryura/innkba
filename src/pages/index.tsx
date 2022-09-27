import Quote from 'components/atoms/quote'
import PageLayout from 'components/layout/pageLayout'
import SectionLayout from 'components/layout/sectionLayout'
import PostGrid from 'components/molecules/postGrid'
import Story from 'components/molecules/story'
import HeaderPosts from 'components/sections/home/header-posts'
import { getAllAuthors, getHomePage, getPostsPreview } from 'lib/api'
import { getSectionSlug } from 'lib/utils/section'
import { AuthorPreview, Page, PostPreview } from 'ts/models'

const HomePage = ({
  contentfulPosts,
  page,
  authors
}: {
  contentfulPosts: PostPreview[]
  page: Page
  authors: AuthorPreview[]
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

  const authorsSearcher = authors?.map((au) => {
    return {
      title: au.name,
      href: `/escritores/${au.slug}`,
      category: 'Escritores',
      tag: ''
    }
  })

  // @ts-ignore
  const searcher = tinyPosts.concat(authorsSearcher)

  return (
    <PageLayout posts={searcher}>
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
