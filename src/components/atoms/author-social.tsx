import clsx from 'clsx'
import Link from 'next/link'
import { Author } from 'ts/models'
import FacebookIcon from './icons/facebook'
import InstagramIcon from './icons/instagram'
import LinkedinIcon from './icons/linkedin'
import MailIcon from './icons/mail'
import SpotifyIcon from './icons/spotify'
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
    <div className={clsx('sm:ml-auto flex items-center space-x-4', className)}>
      {author.facebook && (
        <Link href={author.facebook} passHref>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-violet transition-all duration-150"
            aria-label="Author's facebook"
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
            aria-label="Author's twitter"
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
            aria-label="Author's instagram"
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
            aria-label="Author's linkedin"
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
            aria-label="Author's website"
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
            aria-label="Author's mail"
          >
            <MailIcon />
          </a>
        </Link>
      )}
      {author.spotify && (
        <Link href={author.spotify}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-violet transition-all duration-150"
            aria-label="Author's spotify"
          >
            <SpotifyIcon />
          </a>
        </Link>
      )}
    </div>
  )
}

export default AuthorSocial
