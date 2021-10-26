import { useState } from 'react'
import { ContentfulPost } from 'ts/models'
import Post from '../atoms/post'
import SectionLayout from '../layout/sectionLayout'
import Button from '../primitives/button'

type Props = {
  posts: ContentfulPost[]
  title?: string
  copy?: string
  id: string
}

const PostGrid = ({ posts, title, copy, id }: Props) => {
  const [morePosts, setMorePosts] = useState(6)

  const postsLimit = posts.length
  const regularGridPosts = posts.slice(0, morePosts)

  const handlePosts = () => {
    if (morePosts < postsLimit) {
      setMorePosts((prev) => prev + 3)
    } else if (morePosts >= postsLimit) {
      setMorePosts(6)
      // @ts-ignore
      const element = document.getElementById(id)
      element?.scrollIntoView()
    }
  }

  return (
    <div id={id} className="-mt-32 pt-32">
      <SectionLayout title={title} copy={copy} colCenter>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 lg:gap-x-10">
          {regularGridPosts.map((post, idx) => (
            <Post key={idx} post={post} />
          ))}
        </div>
        {posts.length > 6 && (
          <Button
            type="tertiary"
            className="max-w-max mt-16"
            onClick={handlePosts}
          >
            {morePosts < postsLimit ? 'Ver más' : 'Ver menos'}
          </Button>
        )}
      </SectionLayout>
    </div>
  )
}

export default PostGrid
