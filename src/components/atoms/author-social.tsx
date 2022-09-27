import clsx from 'clsx'
import Link from 'next/link'
import { Author } from 'ts/models'
import FacebookIcon from './icons/facebook'
import InstagramIcon from './icons/instagram'
import LinkedinIcon from './icons/linkedin'
import MailIcon from './icons/mail'
import TwitterIcon from './icons/twitter'
import WebsiteIcon from './icons/website'

const AuthorSocial = ({
  author,
  className
}: {
  author: Author
  className?: string
}) => {
  return (
    <div className={clsx('sm:ml-auto flex items-center space-x-3', className)}>
      {author.facebook && (
        <Link href={author.facebook} passHref>
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
      {author.twitter && (
        <Link href={author.twitter}>
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
      {author.instagram && (
        <Link href={author.instagram}>
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
      {author.linkedin && (
        <Link href={author.linkedin}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-violet transition-all duration-150 mb-1"
            aria-label="Autho's linkedin"
          >
            <LinkedinIcon />
          </a>
        </Link>
      )}
      {author.website && (
        <Link href={author.website}>
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
      {author.email && (
        <Link href={`mailto:${author.email}`}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-violet transition-all duration-150"
            aria-label="Autho's website"
          >
            <MailIcon />
          </a>
        </Link>
      )}
    </div>
  )
}

export default AuthorSocial
