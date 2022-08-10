import { ContentfulPost } from 'ts/models'
import Image from 'next/image'
import Link from 'next/link'
import FacebookIcon from './icons/facebook'
import TwitterIcon from './icons/twitter'
import InstagramIcon from './icons/instagram'
import LinkedinIcon from './icons/linkedin'
import WebsiteIcon from './icons/website'
import clsx from 'clsx'

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
          />
        </div>
      )}
      <div
        className={clsx('flex flex-grow flex-col justify-between', {
          'sm:ml-8 mt-4': author[0].image
        })}
      >
        <div className="mb-5">
          <p className="mb-2 font-medium text-22">{author[0].name}</p>
          <p className="text-15">{author[0].shortDescription}</p>
        </div>
        <div className="ml-auto flex space-x-3">
          {author[0].facebook && (
            <Link href={author[0].facebook} passHref>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-violet transition-all duration-150"
                aria-label="Autho's facebook"
              >
                <FacebookIcon />
              </a>
            </Link>
          )}
          {author[0].twitter && (
            <Link href={author[0].twitter}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-violet transition-all duration-150"
                aria-label="Autho's twitter"
              >
                <TwitterIcon />
              </a>
            </Link>
          )}
          {author[0].instagram && (
            <Link href={author[0].instagram}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-violet transition-all duration-150"
                aria-label="Autho's instagram"
              >
                <InstagramIcon />
              </a>
            </Link>
          )}
          {author[0].linkedin && (
            <Link href={author[0].linkedin}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-violet transition-all duration-150"
                aria-label="Autho's linkedin"
              >
                <LinkedinIcon />
              </a>
            </Link>
          )}
          {author[0].website && (
            <Link href={author[0].website}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-violet transition-all duration-150"
                aria-label="Autho's website"
              >
                <WebsiteIcon />
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostAuthor
