import SectionLayout from 'components/layout/sectionLayout'
import PostWithoutImage from 'components/atoms/post/withoutImage'
import { Post } from 'ts/models'

const TwoGridPost = ({ posts }: { posts: Post[] }) => {
  return (
    <SectionLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10">
        {posts.map((post, idx) => (
          <PostWithoutImage
            key={idx}
            title={post.title}
            copy={post.copy ?? ''}
            link={post.link}
          />
        ))}
      </div>
    </SectionLayout>
  )
}

export default TwoGridPost
