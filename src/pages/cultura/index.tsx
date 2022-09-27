import PageLayout from 'components/layout/pageLayout'
import {
  getAllAuthors,
  getCulturePage,
  getCulturePosts,
  getPostsPreview
} from 'lib/api'
import { AuthorPreview, Page, PostPreview } from 'ts/models'
import SectionHeader from 'components/molecules/sectionHeader'
import PostGrid from 'components/molecules/postGrid'
import FullScreenPost from 'components/atoms/post/fullScreenPost'
import Section from 'components/molecules/section'
import clsx from 'clsx'
import { getSectionSlug } from 'lib/utils/section'

const Cultura = ({
  posts,
  page,
  allPosts,
  authors
}: {
  posts: PostPreview[]
  page: Page
  allPosts: PostPreview[]
  authors: AuthorPreview[]
}) => {
  const sections = [
    ...new Set(posts.map((item) => item?.tag)) //New array with all years
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
  const searcher = tinyPosts.concat(authorsSearcher)

  return (
    <PageLayout posts={searcher} headProps={{ title: 'Innk ba | Cultura' }}>
      <SectionHeader
        image={{
          src: page.header.illustration.src,
          title: page.header.illustration.label ?? 'Lifestyle Header Illo',
          width: page.header.illustration.width,
          height: page.header.illustration.height
        }}
        title={page.header.title}
        author={page.header.author}
        ctas={[
          {
            href: 'mailto:test@example.com?subject=Hola, quiero escribir en la sección de cultura!',
            label: 'Escribí en Innk'
          },
          {
            href: '#lo-mas-destacado',
            label: 'Seguí leyendo'
          }
        ]}
      />
      <Section section="Lo mas destacado">
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
  const posts = await getCulturePosts()
  const page = await getCulturePage()
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

export default Cultura
