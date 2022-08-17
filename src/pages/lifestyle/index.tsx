import PageLayout from 'components/layout/pageLayout'
import { getLifestylePage, getLifestylePosts, getPostsPreview } from 'lib/api'
import { Page, PostPreview } from 'ts/models'
import SectionHeader from 'components/molecules/sectionHeader'
import PostGrid from 'components/molecules/postGrid'
import FullScreenPost from 'components/atoms/post/fullScreenPost'
import Section from 'components/molecules/section'
import clsx from 'clsx'
import { getSectionSlug } from 'lib/utils/section'

const Lifestyle = ({
  posts,
  page,
  allPosts
}: {
  posts: PostPreview[]
  page: Page
  allPosts: PostPreview[]
}) => {
  const sections = [
    ...new Set(posts.map((item) => item?.tag)) //New array with all years
  ]
  const filteredPosts = posts.filter((p) => {
    return page.featuredPosts?.find((el) => el.title !== p.title)
  })

  const tinyPosts = allPosts.map((p) => {
    const section = getSectionSlug(p.category)
    return {
      title: p.title,
      href: `/${section}/${p.slug}`,
      category: p.category,
      tag: p.tag
    }
  })
  return (
    <PageLayout posts={tinyPosts} headProps={{ title: 'Innk ba | Lifestyle' }}>
      <SectionHeader
        image={{
          src: page.header.illustration.src,
          title: page.header.illustration.label ?? 'Lifestyle Header Illo',
          width: page.header.illustration.width,
          height: page.header.illustration.height
        }}
        title={page.header.title}
        copy={page.header.copy}
        ctas={[
          {
            href: `#lo-mas-destacado`,
            label: 'Seguí leyendo'
          },
          {
            href: 'mailto:innkba@gmail.com?subject=Hola! Me gustaría escribir en la sección de lifestyle!',
            label: 'Escribí en Innk'
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
            posts={filteredPosts.filter((p) => p.tag === section)}
          />
        </Section>
      ))}
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const posts = await getLifestylePosts()
  const page = await getLifestylePage()
  const allPosts = await getPostsPreview()

  return {
    props: {
      posts: posts ?? null,
      page: page ?? null,
      allPosts: allPosts ?? null
    }
  }
}

export default Lifestyle
