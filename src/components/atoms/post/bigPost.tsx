import clsx from 'clsx'
import Button from 'components/primitives/button'
import Image from 'next/image'
import { Post } from 'ts/models'

type Props = {
  post: Post
}

const BigPost = ({ post }: Props) => {
  return (
    <div className="flex flex-col">
      <Image
        src={post.image.src}
        alt={post.image.title ?? post.title}
        width={650}
        height={360}
        className="rounded-xl"
        objectFit="cover"
      />
      <p
        className={clsx('text-16 mt-6 mb-3 font-semibold capitalize', {
          'text-blue': post.category === 'lifestyle',
          'text-yellow': post.category === 'arte',
          'text-green': post.category === 'cultura',
          'text-violet': post.category === 'literatura',
          'text-red': post.category === 'viajes'
        })}
      >
        {post.category}
      </p>
      <p className="text-28 sm:text-34 font-bold leading-smooth">
        {post.title}
      </p>
      <p className="text-14 md:text-16 font-medium text-gray-400 mt-3 mb-7 max-w-lg">
        {post.copy}
      </p>
      <Button className="max-w-max" href={post.link.href}>
        {post.link.label ?? 'Read More'}
      </Button>
    </div>
  )
}

export default BigPost
