import PageLayout from 'components/layout/pageLayout'
import { getPosts } from 'lib/api'
import { ContentfulPost } from 'ts/models'
import SectionHeader from 'components/molecules/sectionHeader'

const Lifestyle = ({ posts }: { posts: ContentfulPost[] }) => {
  return (
    <PageLayout posts={posts} headProps={{ title: 'Innk ba | Lifestyle' }}>
      <SectionHeader
        image={{
          src: '/images/lifestyle-header.svg',
          title: 'Lifestyle header illo',
          width: 700,
          height: 525
        }}
        title="Discover hundreds of most beautiful places to visit"
        copy="Argentine cuisine is described as a cultural blending of Mediterranean influences (such as those created by Italian and Spanish."
        ctas={[
          { href: '/', label: 'Keep Reading' },
          { href: '', label: 'Write for us' }
        ]}
      />
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()

  return {
    props: {
      posts: posts ?? null
    }
  }
}

export default Lifestyle
