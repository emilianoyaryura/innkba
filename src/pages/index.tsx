import PageLayout from 'components/layout/pageLayout'
import PostGrid from 'components/molecules/postGrid'
import { posts } from 'hardcodedData'
import HeaderPosts from 'components/sections/home/header-posts'
import TwoGridPost from 'components/molecules/twoGridPost'
import PostWithImageSlider from 'components/molecules/postWithImageSlider'
import Spotify from 'components/molecules/spotify'
import Slider, { SlideProps } from 'components/molecules/slider'
import FullScreenPost from 'components/atoms/post/fullScreenPost'

const slides: SlideProps[] = [
  {
    title: 'Buenos Aires',
    img: 'https://images.unsplash.com/photo-1612294037637-ec328d0e075e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
  },
  {
    img: 'https://images.unsplash.com/photo-1495317823589-e67efe1524b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    link: {
      label: 'Seguir Leyendo',
      href: '/'
    }
  },
  {
    img: 'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2698&q=80'
  },
  {
    title: 'Mendoza',
    img: 'https://images.unsplash.com/photo-1490604001847-b712b0c2f967?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80',
    link: {
      href: '/'
    }
  }
]

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
      <Slider slides={slides} />
      <FullScreenPost post={posts[0]} />
    </PageLayout>
  )
}

export default HomePage
