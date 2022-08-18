import clsx from 'clsx'
import { getSectionSlug } from 'lib/utils/section'
import Image from 'next/image'
import Link from 'next/link'
import { PostPreview } from 'ts/models'

const Post = ({
  post,
  withoutCategory
}: {
  post: PostPreview
  withoutCategory?: boolean
}) => {
  const section = getSectionSlug(post.category)
  return (
    <Link href={`/${section}/${post.slug}`}>
      <a
        className="flex flex-col cursor-pointer noDecoration group"
        aria-label="go to post"
      >
        <Image
          src={post.image.src ?? ''}
          alt={post.image.title ?? ''}
          width={320}
          height={270}
          className="rounded-xl transition-all duration-150 group-hover:opacity-90"
          objectFit="cover"
        />
        <div className="mt-5 pr-3">
          {!withoutCategory && (
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
          )}
          <p className="text-18 font-semibold">{post.title}</p>
          <div className="mt-4 max-w-max">
            <span className="text-14 mb-1 font-semibold">Seguir Leyendo</span>
            <div className="h-px w-full bg-black" />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Post
