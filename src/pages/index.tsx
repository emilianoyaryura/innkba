import PageLayout from 'components/layout/pageLayout'
import PostGrid from 'components/molecules/postGrid'
import HeaderPosts from 'components/sections/home/header-posts'
import { getPosts } from 'lib/api'
import { ContentfulPost } from 'ts/models'

const HomePage = ({
  contentfulPosts
}: {
  contentfulPosts: ContentfulPost[]
}) => {
  return (
    <PageLayout posts={contentfulPosts} headProps={{ title: 'Innk ba' }}>
      <HeaderPosts
        principalPost={contentfulPosts[0]}
        posts={contentfulPosts.slice(0, 4)}
      />
      <PostGrid
        id="newBlogPosts"
        title="New Blog Posts"
        copy="Don’t miss this originals short stories. New chapters every weekend of this awesome writers. "
        posts={contentfulPosts}
      />
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()

  return {
    props: {
      contentfulPosts: posts ?? null
    }
  }
}

export default HomePage
