import { useState } from 'react'
import { ContentfulPost } from 'ts/models'
import Post from '../atoms/post'
import SectionLayout from '../layout/sectionLayout'
import Button from '../primitives/button'

type Props = {
  posts: ContentfulPost[]
  title?: string
  copy?: string
}

const PostGrid = ({ posts, title, copy }: Props) => {
  const [morePosts, setMorePosts] = useState(6)
  const postsLimit = posts.length
  const regularGridPosts = posts.slice(0, morePosts)

  const handlePosts = () => {
    if (morePosts < postsLimit) {
      setMorePosts((prev) => prev + 3)
    } else setMorePosts(postsLimit - 3)
  }
  return (
    <SectionLayout title={title} copy={copy}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 lg:gap-x-10">
        {regularGridPosts.map((post, idx) => (
          <Post key={idx} post={post} />
        ))}
      </div>
      {morePosts < postsLimit && (
        <Button
          type="tertiary"
          className="max-w-max mx-auto mt-16"
          onClick={handlePosts}
        >
          Ver más
        </Button>
      )}
    </SectionLayout>
  )
}

export default PostGrid
