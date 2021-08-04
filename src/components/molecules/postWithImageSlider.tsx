import SectionLayout from 'components/layout/sectionLayout'
import { Post } from 'ts/models'
import Image from 'next/image'
import HorizontalPost from 'components/atoms/post/horizontal'
import RegularPost from 'components/atoms/post'

type PostWithImageSliderProps = {
  posts: Post[]
  images: {
    href: string
    title?: string
  }[]
  title?: string
  copy?: string
}

const PostWithImageSlider = ({
  posts,
  images,
  title,
  copy
}: PostWithImageSliderProps) => {
  console.log(images)
  return (
    <SectionLayout title={title} copy={copy}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="hidden md:flex flex-col justify-between">
          {posts.map((post, idx) => (
            <HorizontalPost
              key={idx}
              title={post.title}
              category={post.category}
              link={post.link}
              image={post.image}
            />
          ))}
        </div>
        <Image
          src="https://images.unsplash.com/photo-1584844602065-ef8d33980776?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
          alt="Image"
          height={540}
          width={414}
          className="rounded-xl"
          objectFit="cover"
        />
        <div className="flex md:hidden">
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

export default PostWithImageSlider
