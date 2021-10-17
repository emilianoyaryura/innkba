import clsx from 'clsx'
import Button from 'components/primitives/button'
import { getSectionSlug } from 'lib/utils/section'
import Image from 'next/image'
import { ContentfulPost } from 'ts/models'
import s from './bigPost.module.css'
import Link from 'next/link'

const BigPost = ({ post }: { post: ContentfulPost }) => {
  const section = getSectionSlug(post.category)
  return (
    <Link href={`/${section}/${post.slug}`}>
      <div className="flex flex-col cursor-pointer">
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
        <p
          className={clsx(
            'text-14 md:text-16 font-medium text-gray-400 mt-3 mb-7 max-w-lg',
            s.copy
          )}
        >
          {post.copy}
        </p>
        <Button className="max-w-max">Seguir Leyendo</Button>
      </div>
    </Link>
  )
}

export default BigPost
