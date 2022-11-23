import clsx from 'clsx'
import { getSectionSlug } from 'lib/utils/section'
import Image from 'next/image'
import Link from 'next/link'
import { PostPreview } from 'ts/models'

const HorizontalPost = ({ post }: { post: PostPreview }) => {
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
            {post.tag}
          </p>
          <p className="text-18 font-semibold max-w-sm md:leading-smooth">
            {post.title}
          </p>
          <div className="mt-4 max-w-max">
            {post.author.name === 'Innk ba' ? (
              <span className="text-14 mb-1 font-semibold">Seguir Leyendo</span>
            ) : (
              <span className="text-14 mb-1 font-normal">
                Por <span className="font-bold">{post.author.name}</span>
              </span>
            )}
            {post.author.name === 'Innk ba' && (
              <div className="h-px w-full bg-black" />
            )}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default HorizontalPost
