import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { ContentfulPost } from 'ts/models'

const HorizontalPost = ({ post }: { post: ContentfulPost }) => {
  return (
    <div className="flex">
      <Image
        src={post.image.src ?? ''}
        alt={post.image.title}
        width={140}
        height={140}
        className="rounded-xl"
        objectFit="cover"
      />
      <div className="ml-3 lg:ml-8 pt-2">
        <p
          className={clsx('mb-2 text-14 font-semibold capitalize', {
            'text-blue': post.category === 'Lifestyle',
            'text-yellow': post.category === 'Arte',
            'text-green': post.category === 'Cultura',
            'text-violet': post.category === 'Literatura',
            'text-red': post.category === 'Viajes'
          })}
        >
          {post.category}
        </p>
        <p className="text-18 font-semibold max-w-sm md:leading-smooth lg:leading-tight">
          {post.title}
        </p>
        <Link href={post.slug}>
          <div className="mt-4 max-w-max cursor-pointer">
            <span className="text-14 mb-1 font-semibold">Keep Reading</span>
            <div className="h-px w-full bg-black" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default HorizontalPost
