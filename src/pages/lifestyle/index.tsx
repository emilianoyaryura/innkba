import PageLayout from 'components/layout/pageLayout'
import { getLifestylePage, getPosts } from 'lib/api'
import { ContentfulPost, Page } from 'ts/models'
import SectionHeader from 'components/molecules/sectionHeader'

const Lifestyle = ({
  posts,
  page
}: {
  posts: ContentfulPost[]
  page: Page
}) => {
  return (
    <PageLayout posts={posts} headProps={{ title: 'Innk ba | Lifestyle' }}>
      <SectionHeader
        image={{
          src: page.header.illustration.src,
          title: page.header.illustration.label ?? 'Lifestyle Header Illo',
          width: page.header.illustration.width,
          height: page.header.illustration.height
        }}
        title={page.header.title}
        copy={page.header.copy}
        ctas={page.header.ctas}
      />
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()
  const page = await getLifestylePage()

  return {
    props: {
      posts: posts ?? null,
      page: page ?? null
    }
  }
}

export default Lifestyle
