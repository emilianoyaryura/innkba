import PageLayout from 'components/layout/pageLayout'
import TravelHeader from 'components/sections/travel/header'
import {
  getAllAuthors,
  getPostsPreview,
  getTravelPage,
  getTravelPosts
} from 'lib/api'
import { AuthorPreview, Page, PostPreview } from 'ts/models'
import Section from 'components/molecules/section'
import FullScreenPost from 'components/atoms/post/fullScreenPost'
import PostGrid from 'components/molecules/postGrid'
import clsx from 'clsx'
import { getSectionSlug } from 'lib/utils/section'

const Viajes = ({
  posts,
  allPosts,
  page,
  authors
}: {
  posts: PostPreview[]
  page: Page
  authors: AuthorPreview[]
  allPosts: PostPreview[]
}) => {
  const sections = [
    ...new Set(posts.map((item) => item?.tag)) //New array with all tags
  ]

  const tinyPosts = allPosts.map((p) => {
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
  const searcher = tinyPosts?.concat(authorsSearcher)

  return (
    <PageLayout posts={searcher} headProps={{ title: 'Innk ba | Viajes' }}>
      <TravelHeader />
      <Section section="Lo más destacado">
        <div>
          {page.featuredPosts && (
            <>
              <div className="hidden md:flex flex-col">
                <FullScreenPost
                  post={page.featuredPosts[0]}
                  className={clsx('', {
                    'mb-12': page.featuredPosts.length > 1
                  })}
                />
                <PostGrid
                  withoutMargins
                  id="LoMasDestacado"
                  posts={page.featuredPosts.slice(1, 10)}
                />
              </div>
              <div className="flex md:hidden flex-col">
                <PostGrid
                  withoutMargins
                  id="LoMasDestacado"
                  posts={page.featuredPosts}
                />
              </div>
            </>
          )}
        </div>
      </Section>
      {sections.map((section, idx) => (
        <Section key={idx} section={section}>
          <PostGrid
            withoutMargins
            id="LoMasDestacado"
            posts={posts.filter((p) => p.tag === section)}
          />
        </Section>
      ))}
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const posts = await getTravelPosts()
  const page = await getTravelPage()
  const allPosts = await getPostsPreview()
  const authors = await getAllAuthors()

  return {
    props: {
      posts: posts ?? null,
      page: page ?? null,
      allPosts: allPosts ?? null,
      authors: authors ?? null
    }
  }
}

export default Viajes
