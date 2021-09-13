import SectionLayout from 'components/layout/sectionLayout'
import BigPost from 'components/atoms/post/bigPost'
import { ContentfulPost } from 'ts/models'
import HorizonalPost from 'components/atoms/post/horizontal'
import RegularPost from 'components/atoms/post'

type Props = {
  principalPost: ContentfulPost
  posts: ContentfulPost[]
}

const HeaderPosts = ({ posts, principalPost }: Props) => {
  return (
    <SectionLayout classname="-mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 lg:gap-16">
        <BigPost post={principalPost} />
        <div className="hidden md:flex flex-col justify-between space-y-6">
          {posts.map((post, idx) => (
            <HorizonalPost key={idx} post={post} />
          ))}
        </div>
        <div className="flex md:hidden mt-4">
          <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 lg:gap-x-10">
            {posts.map((post, idx) => (
              <RegularPost key={idx} post={post} />
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default HeaderPosts
