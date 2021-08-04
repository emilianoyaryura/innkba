import SectionLayout from 'components/layout/sectionLayout'
import BigPost from 'components/atoms/post/bigPost'
import { Post } from 'ts/models'
import HorizonalPost from 'components/atoms/post/horizontal'
import RegularPost from 'components/atoms/post'

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
        <div className="flex md:hidden mt-4">
          <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 lg:gap-x-10">
            {posts.map((post, idx) => (
              <RegularPost
                key={idx}
                category={post.category}
                title={post.title}
                image={post.image}
                link={post.link}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default HeaderPosts
