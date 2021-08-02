import SectionLayout from 'components/layout/sectionLayout'
import BigPost from 'components/atoms/post/bigPost'
import { Post } from 'ts/models'
import HorizonalPost from 'components/atoms/post/horizontal'
import PostGrid from 'components/molecules/postGrid'

type Props = {
  principalPost: Post
  posts: Post[]
}

const HeaderPosts = ({ posts, principalPost }: Props) => {
  return (
    <SectionLayout classname="-mt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 lg:gap-16">
        <BigPost post={principalPost} />
        <div className="hidden md:flex flex-col justify-between space-y-6">
          {posts.map((post, idx) => (
            <HorizonalPost
              key={idx}
              title={post.title}
              category={post.category}
              image={post.image}
              link={post.link}
            />
          ))}
        </div>
        <div className="flex md:hidden -mt-14">
          <PostGrid posts={posts} />
        </div>
      </div>
    </SectionLayout>
  )
}

export default HeaderPosts
