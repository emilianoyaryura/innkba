import clsx from 'clsx'
import Button from 'components/primitives/button'
import Image from 'next/image'
import { ContentfulPost } from 'ts/models'

const BigPost = ({ post }: { post: ContentfulPost }) => {
  return (
    <div className="flex flex-col">
      <Image
        src={post.image.src ?? ''}
        alt={post.image.title ?? post.title}
        width={650}
        height={360}
        className="rounded-xl"
        objectFit="cover"
      />
      <p
        className={clsx('text-16 mt-6 mb-3 font-semibold capitalize', {
          'text-blue': post.category === 'Lifestyle',
          'text-yellow': post.category === 'Arte',
          'text-green': post.category === 'Cultura',
          'text-violet': post.category === 'Literatura',
          'text-red': post.category === 'Viajes'
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
      <Button className="max-w-max" href={post.slug}>
        'Seguir Leyendo'
      </Button>
    </div>
  )
}

export default BigPost
