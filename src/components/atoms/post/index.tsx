import clsx from 'clsx'
import { getSectionSlug } from 'lib/utils/section'
import Link from 'next/link'
import { PostPreview } from 'ts/models'

const Post = ({
  post,
  withoutCategory
}: {
  post: PostPreview
  withoutCategory?: boolean
}) => {
  const section = post.category
    ? getSectionSlug(post.category)
    : 'arte-y-literatura'
  return (
    <Link href={`/${section}/${post.slug}`}>
      <a
        className="flex flex-col cursor-pointer noDecoration group"
        aria-label="go to post"
      >
        <img
          src={post.image.src ?? ''}
          alt={post.image.title ?? ''}
          className="rounded-xl transition-all w-full duration-150 group-hover:opacity-90 object-cover"
          style={{ height: '270px' }}
        />
        <div className="mt-5 pr-3">
          {!withoutCategory && (
            <p
              className={clsx('mb-2 text-14 font-semibold', {
                'text-blue': post.category === 'Lifestyle',
                'text-yellow': post.category === 'Arte y Literatura',
                'text-violet': post.category === 'Cultura',
                'text-red': post.category === 'Viajes'
              })}
            >
              {post.tag}
            </p>
          )}
          <p className="text-18 font-semibold">{post.title}</p>
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

export default Post
