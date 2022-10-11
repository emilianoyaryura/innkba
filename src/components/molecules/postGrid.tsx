import clsx from 'clsx'
import { useState } from 'react'
import { PostPreview } from 'ts/models'
import Post from '../atoms/post'
import Button from '../primitives/button'
import Container from 'components/layout/container'
import Spotify from './spotify'
import { getSectionSlug } from 'lib/utils/section'

type Props = {
  posts: PostPreview[]
  id: string
  withoutMargins?: boolean
}

const PostGrid = ({ posts, id, withoutMargins }: Props) => {
  const spotifyPost = posts.filter(
    (post) => post.spotify && post.spotify?.iframe !== ''
  )[0]
  const [morePosts, setMorePosts] = useState(spotifyPost ? 7 : 6)

  const postsLimit = posts.length
  const useSpotifyPost = spotifyPost && postsLimit > 3 ? true : false

  const regularGridPosts = posts.slice(useSpotifyPost ? 4 : 0, morePosts)

  const handlePosts = () => {
    if (morePosts < postsLimit) {
      setMorePosts((prev) => prev + 6)
    } else if (morePosts >= postsLimit) {
      setMorePosts(useSpotifyPost ? 7 : 6)
      // @ts-ignore
      const element = document.getElementById(id)
      element?.scrollIntoView()
    }
  }

  return (
    <div
      id={id}
      className={clsx('', {
        '-mt-32 pt-32': !withoutMargins
      })}
    >
      <Container withoutPadding size="large">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 sm:gap-y-10 lg:gap-y-16 gap-x-5 lg:gap-x-10">
          {!useSpotifyPost
            ? regularGridPosts.map((post, idx) => (
                <Post key={idx} post={post} />
              ))
            : posts
                .filter((p) => p.title !== spotifyPost.title)
                .slice(0, 3)
                .map((post, idx) => <Post key={idx} post={post} />)}
          {useSpotifyPost && (
            <Spotify
              title={spotifyPost.title}
              copy={spotifyPost.copy}
              iframe={spotifyPost.spotify?.iframe ?? ''}
              link={{ href: spotifyPost.spotify?.link ?? '' }}
              secondLink={{
                href: `/${getSectionSlug(spotifyPost.category)}/${
                  spotifyPost.slug
                }`
              }}
            />
          )}
          {useSpotifyPost &&
            regularGridPosts.map((post, idx) => <Post key={idx} post={post} />)}
        </div>
        {posts.length > 6 && (
          <Button
            type="tertiary"
            className="max-w-max mt-16 mx-auto"
            onClick={handlePosts}
          >
            {morePosts < postsLimit ? 'Ver más' : 'Ver menos'}
          </Button>
        )}
      </Container>
    </div>
  )
}

export default PostGrid
