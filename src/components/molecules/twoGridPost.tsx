import SectionLayout from 'components/layout/sectionLayout'
import PostWithoutImage from 'components/atoms/post/withoutImage'
import { ContentfulPost } from 'ts/models'

const TwoGridPost = ({ posts }: { posts: ContentfulPost[] }) => {
  return (
    <SectionLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10">
        {posts.map((post, idx) => (
          <PostWithoutImage key={idx} post={post} />
        ))}
      </div>
    </SectionLayout>
  )
}

export default TwoGridPost
