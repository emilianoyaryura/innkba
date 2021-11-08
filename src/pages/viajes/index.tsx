import PageLayout from 'components/layout/pageLayout'
import TravelHeader from 'components/sections/travel/header'
import { getTravelPage, getTravelPosts } from 'lib/api'
import { ContentfulPost, Page } from 'ts/models'
import Section from 'components/molecules/section'
import Container from 'components/layout/container'
import FullScreenPost from 'components/atoms/post/fullScreenPost'
import PostGrid from 'components/molecules/postGrid'

const Viajes = ({ posts, page }: { posts: ContentfulPost[]; page: Page }) => {
  const sections = [
    ...new Set(posts.map((item) => item?.tag)) //New array with all years
  ]
  const filteredPosts = posts.filter((p) => {
    return page.featuredPosts?.find((el) => el.title !== p.title)
  })
  return (
    <PageLayout posts={posts} headProps={{ title: 'Innk ba | Viajes' }}>
      <TravelHeader />
      <Container size="large">
        <h1 className="text-28 text-center sm:text-left lg:text-34 font-bold -mb-4 mt-28">
          Lo más destacado
        </h1>
      </Container>
      {page.featuredPosts && page.featuredPosts?.length > 1 ? (
        <div className="-mb-24">
          <PostGrid
            withoutMargins
            id="LoMasDestacado"
            posts={page.featuredPosts}
          />
        </div>
      ) : (
        <FullScreenPost post={page.featuredPosts[0]} />
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
  const posts = await getTravelPosts()
  const page = await getTravelPage()

  return {
    props: {
      posts: posts ?? null,
      page: page ?? null
    }
  }
}

export default Viajes
