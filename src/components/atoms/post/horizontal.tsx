import clsx from 'clsx'
import { getSectionSlug } from 'lib/utils/section'
import Image from 'next/image'
import Link from 'next/link'
import { ContentfulPost } from 'ts/models'

const HorizontalPost = ({ post }: { post: ContentfulPost }) => {
  const section = getSectionSlug(post.category)
  return (
    <Link href={`/${section}/${post.slug}`}>
      <a className="flex cursor-pointer noDecoration group max-w-max">
        <Image
          src={post.image.src ?? ''}
          alt={post.image.title}
          width={140}
          height={140}
          className="rounded-xl transition-all duration-150 group-hover:opacity-90"
          objectFit="cover"
        />
        <div className="ml-3 lg:ml-8 pt-2">
          <p
            className={clsx('mb-2 text-14 font-semibold capitalize', {
              'text-blue': post.category === 'Lifestyle',
              'text-yellow': post.category === 'Arte y Literatura',
              'text-violet': post.category === 'Cultura',
              'text-red': post.category === 'Viajes'
            })}
          >
            {post.category}
          </p>
          <p className="text-18 font-semibold max-w-sm md:leading-smooth lg:leading-tight">
            {post.title}
          </p>
          <div className="mt-4 max-w-max transition-all duration-150 hover:opacity-70">
            <span className="text-14 mb-1 font-semibold">Seguir Leyendo</span>
            <div className="h-px w-full bg-black" />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default HorizontalPost
