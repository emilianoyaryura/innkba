import clsx from 'clsx'
import Button from 'components/primitives/button'
import { getSectionSlug } from 'lib/utils/section'
import Image from 'next/image'
import { PostPreview } from 'ts/models'
import s from './bigPost.module.css'
import Link from 'next/link'

const BigPost = ({ post }: { post: PostPreview }) => {
  const section = getSectionSlug(post.category)
  return (
    <Link href={`/${section}/${post.slug}`}>
      <a className="flex flex-col group cursor-pointer noDecoration">
        <Image
          src={post.image.src ?? ''}
          alt={post.image.title ?? post.title}
          width={650}
          height={360}
          className="rounded-xl transition-all duration-150 group-hover:opacity-90"
          objectFit="cover"
        />
        <p
          className={clsx('text-16 mt-4 mb-3 font-semibold capitalize', {
            'text-blue': post.category === 'Lifestyle',
            'text-yellow': post.category === 'Arte y Literatura',
            'text-violet': post.category === 'Cultura',
            'text-red': post.category === 'Viajes'
          })}
        >
          {post.tag}
        </p>
        <p className="text-22 sm:text-30 md:text-26 lg:text-30 font-bold leading-smooth">
          {post.title}
        </p>
        <p
          className={clsx(
            'text-14 md:text-16 font-medium text-gray-600 mt-3 mb-7 max-w-lg',
            s.copy
          )}
        >
          {post.copy}
        </p>

        <div
          className={clsx('max-w-max', {
            'mt-4': post.author.name === 'Innk ba'
          })}
        >
          {post.author.name === 'Innk ba' ? (
            <Button className="max-w-max">Seguir Leyendo</Button>
          ) : (
            <span className="text-14 sm:text-16 mb-1 font-normal -mt-2">
              Por <span className="font-bold">{post.author.name}</span>
            </span>
          )}
        </div>
      </a>
    </Link>
  )
}

export default BigPost
