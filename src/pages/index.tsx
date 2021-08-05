import PageLayout from 'components/layout/pageLayout'
import PostGrid from 'components/molecules/postGrid'
import { posts } from 'hardcodedData'
import HeaderPosts from 'components/sections/home/header-posts'
import TwoGridPost from 'components/molecules/twoGridPost'
import PostWithImageSlider from 'components/molecules/postWithImageSlider'
import Spotify from 'components/molecules/spotify'

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
      <Spotify
        title="Every journey needs a soundtrack"
        copy="Tune in to the sounds of Spain and Latin America with our curated Spotify playlist. You be mouthing out the lyrics before you know it."
        link={{ href: '/' }}
        secondLink={{ href: '/' }}
        iframe="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3"
      />
    </PageLayout>
  )
}

export default HomePage
