import PageLayout from 'components/layout/pageLayout'
import PostGrid from 'components/molecules/postGrid'
import HeaderPosts from 'components/sections/home/header-posts'
import TwoGridPost from 'components/molecules/twoGridPost'
import PostWithImageSlider from 'components/molecules/postWithImageSlider'
import Spotify from 'components/molecules/spotify'
import Slider, { SlideProps } from 'components/molecules/slider'
import FullScreenPost from 'components/atoms/post/fullScreenPost'
import Quote from 'components/atoms/quote'
import { getPosts } from 'lib/api'
import { ContentfulPost } from 'ts/models'

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

const HomePage = ({
  contentfulPosts
}: {
  contentfulPosts: ContentfulPost[]
}) => {
  return (
    <PageLayout headProps={{ title: 'Innk ba' }}>
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
      <TwoGridPost posts={contentfulPosts.slice(0, 2)} />
      <PostWithImageSlider
        title="New Story Every Sunday"
        copy="Don’t miss this originals short stories. New chapters every weekend of this awesome writers. "
        images={[{ href: '', title: '' }]}
        posts={contentfulPosts.slice(0, 3)}
      />
      <Spotify
        title="Every journey needs a soundtrack"
        copy="Tune in to the sounds of Spain and Latin America with our curated Spotify playlist. You be mouthing out the lyrics before you know it."
        link={{ href: '/' }}
        secondLink={{ href: '/' }}
        iframe="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3"
      />
      <Slider slides={slides} />
      <FullScreenPost post={contentfulPosts[0]} />

      <Quote
        author={{
          name: 'Ernest Hemingway',
          dates: { birth: 1899, death: 1961 },
          image:
            'https://images.unsplash.com/photo-1609090459635-b428136bc13e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
        }}
        quote="All modern American literature comes from one book by Mark Twain called Huckleberry Finn. There was nothing before. There has been nothing as good since."
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
