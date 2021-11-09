import PageLayout from 'components/layout/pageLayout'
import { getArtandLiteraturePosts, getLiteraturePage } from 'lib/api'
import { ContentfulPost, Page } from 'ts/models'
import SectionHeader from 'components/molecules/sectionHeader'
import PostGrid from 'components/molecules/postGrid'
import FullScreenPost from 'components/atoms/post/fullScreenPost'
import Section from 'components/molecules/section'
import Quote from 'components/atoms/quote'

const ArteyLiteratura = ({
  posts,
  page
}: {
  posts: ContentfulPost[]
  page: Page
}) => {
  const sections = [
    ...new Set(posts.map((item) => item?.tag)) //New array with all years
  ]
  const filteredPosts = posts.filter((p) => {
    return page.featuredPosts?.find((el) => el.title !== p.title)
  })
  return (
    <PageLayout
      posts={posts}
      headProps={{ title: 'Innk ba | Arte y Literatura' }}
    >
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
            href: '/arte-y-literatura',
            label: 'Seguí leyendo'
          },
          {
            href: 'mailto:test@example.com?subject=Hola, quiero escribir en la sección de Arte y Literatura!',
            label: 'Escribí en Innk'
          }
        ]}
      />
      <Section section="Lo más destacado">
        <div>
          {page.featuredPosts && (
            <>
              <div className="hidden md:flex flex-col">
                <FullScreenPost
                  className="mb-14"
                  post={page.featuredPosts[0]}
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
      {page.weeklyQuote && (
        <Quote
          quote={page.weeklyQuote?.quote}
          author={page.weeklyQuote?.author}
        />
      )}
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
  const posts = await getArtandLiteraturePosts()
  const page = await getLiteraturePage()

  return {
    props: {
      posts: posts ?? null,
      page: page ?? null
    }
  }
}

export default ArteyLiteratura
