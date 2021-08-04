import PageLayout from 'components/layout/pageLayout'
import PostGrid from 'components/molecules/postGrid'
import { posts } from 'hardcodedData'
import HeaderPosts from 'components/sections/home/header-posts'
import TwoGridPost from 'components/molecules/twoGridPost'
import PostWithImageSlider from 'components/molecules/postWithImageSlider'

const HomePage = () => {
  return (
    <PageLayout navProps={{ selected: 'inicio' }}>
      <HeaderPosts principalPost={posts[0]} posts={posts} />
      <PostGrid
        title="New Blog Posts"
        copy="Don’t miss this originals short stories. New chapters every weekend of this awesome writers. "
        posts={posts}
      />
      <TwoGridPost posts={posts.slice(0, 2)} />
      <PostWithImageSlider
        title="New Story Every Sunday"
        copy="Don’t miss this originals short stories. New chapters every weekend of this awesome writers. "
        images={[{ href: '', title: '' }]}
        posts={posts.slice(0, 3)}
      />
    </PageLayout>
  )
}

export default HomePage
