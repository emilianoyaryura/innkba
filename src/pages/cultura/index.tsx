import PageLayout from 'components/layout/pageLayout'
import { getCulturePage, getCulturePosts } from 'lib/api'
import { ContentfulPost, Page } from 'ts/models'
import SectionHeader from 'components/molecules/sectionHeader'
import Container from 'components/layout/container'
import PostGrid from 'components/molecules/postGrid'
import FullScreenPost from 'components/atoms/post/fullScreenPost'
import Section from 'components/molecules/section'

const Cultura = ({ posts, page }: { posts: ContentfulPost[]; page: Page }) => {
  const sections = [
    ...new Set(posts.map((item) => item?.tag)) //New array with all years
  ]
  const filteredPosts = posts.filter((p) => {
    return page.featuredPosts?.find((el) => el.title !== p.title)
  })
  return (
    <PageLayout posts={posts} headProps={{ title: 'Innk ba | Cultura' }}>
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
            href: '/cultura',
            label: 'Seguí leyendo'
          },
          {
            href: 'mailto:test@example.com?subject=Hola, quiero escribir en la sección de cultura!',
            label: 'Escribí en Innk'
          }
        ]}
      />
      <Container size="large">
        <h1 className="text-28 text-center sm:text-left lg:text-34 font-bold mt-28">
          Lo más destacado
        </h1>
      </Container>
      <div className="-mb-24">
        {page.featuredPosts && page.featuredPosts?.length > 1 ? (
          <PostGrid
            withoutMargins
            id="LoMasDestacado"
            posts={page.featuredPosts}
          />
        ) : (
          <FullScreenPost post={page.featuredPosts[0]} />
        )}
      </div>
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
  const posts = await getCulturePosts()
  const page = await getCulturePage()

  return {
    props: {
      posts: posts ?? null,
      page: page ?? null
    }
  }
}

export default Cultura
