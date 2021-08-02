import Post, { PostPreview } from '../atoms/post'
import SectionLayout from '../layout/sectionLayout'

type Props = {
  posts: PostPreview[]
  title?: string
  copy?: string
}

const PostGrid = ({ posts, title, copy }: Props) => {
  return (
    <SectionLayout title={title} copy={copy}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 lg:gap-x-10">
        {posts.map((post, idx) => (
          <Post
            key={idx}
            category={post.category}
            title={post.title}
            image={post.image}
            link={post.link}
          />
        ))}
      </div>
    </SectionLayout>
  )
}

export default PostGrid
