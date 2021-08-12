import { ContentfulPost } from 'ts/models'
import Post from '../atoms/post'
import SectionLayout from '../layout/sectionLayout'

type Props = {
  posts: ContentfulPost[]
  title?: string
  copy?: string
}

const PostGrid = ({ posts, title, copy }: Props) => {
  return (
    <SectionLayout title={title} copy={copy}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 lg:gap-x-10">
        {posts.map((post, idx) => (
          <Post key={idx} post={post} />
        ))}
      </div>
    </SectionLayout>
  )
}

export default PostGrid
