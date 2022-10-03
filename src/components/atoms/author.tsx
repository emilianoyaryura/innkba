import { ContentfulPost } from 'ts/models'
import Image from 'next/image'
import clsx from 'clsx'
import AuthorSocial from './author-social'
import Link from 'next/link'

const PostAuthor = ({ author }: Pick<ContentfulPost, 'author'>) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-center border border-solid border-black p-5 rounded-xl mt-20">
      {author[0].image && (
        <div className="min-w-max">
          <Image
            src={author[0].image}
            alt={author[0].name}
            width={190}
            height={160}
            className="rounded-lg"
            objectFit="cover"
          />
        </div>
      )}
      <div
        className={clsx('flex flex-grow flex-col justify-between', {
          'sm:ml-8 mt-4': author[0].image
        })}
      >
        <div className="mb-5">
          {author[0].slug ? (
            <Link
              aria-label="go to author"
              href={`/escritores/${author[0].slug}`}
            >
              <a aria-label="go to author" className="font-medium text-22">
                {author[0].name}
              </a>
            </Link>
          ) : (
            <p className="font-medium text-22">{author[0].name}</p>
          )}
          <p className="text-15 mt-2">{author[0].shortDescription}</p>
        </div>
        <AuthorSocial author={author[0]} />
      </div>
    </div>
  )
}

export default PostAuthor
