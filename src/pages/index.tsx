import PageLayout from 'components/layout/pageLayout'
import PostGrid from 'components/molecules/postGrid'
import { posts } from 'hardcodedData'
import HeaderPosts from 'components/sections/home/header-posts'

const HomePage = () => {
  return (
    <PageLayout navProps={{ selected: 'inicio' }}>
      <HeaderPosts principalPost={posts[0]} posts={posts} />
      <PostGrid
        title="New Blog Posts"
        copy="Don’t miss this originals short stories. New chapters every weekend of this awesome writers. "
        posts={posts}
      />
    </PageLayout>
  )
}

export default HomePage
