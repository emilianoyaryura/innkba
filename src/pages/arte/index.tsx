import PageLayout from 'components/layout/pageLayout'
import { getArtPage, getPosts } from 'lib/api'
import { ContentfulPost, Page } from 'ts/models'
import SectionHeader from 'components/molecules/sectionHeader'

const Arte = ({ posts, page }: { posts: ContentfulPost[]; page: Page }) => {
  return (
    <PageLayout posts={posts} headProps={{ title: 'Innk ba | Arte' }}>
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
            href: '/arte',
            label: 'Seguí leyendo'
          },
          {
            href: 'mailto:test@example.com?subject=Hola, quiero escribir en la sección de arte!',
            label: 'Escribí en Innk'
          }
        ]}
      />
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()
  const page = await getArtPage()

  return {
    props: {
      posts: posts ?? null,
      page: page ?? null
    }
  }
}

export default Arte
