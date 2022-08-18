import clsx from 'clsx'
import Link from 'next/link'
import { Category } from 'ts/models'
import FacebookIcon from './icons/facebook'
import TwitterIcon from './icons/twitter'
import WhatsAppIcon from './icons/whatsapp'
import { getSectionSlug } from 'lib/utils/section'

const Share = ({
  title,
  slug,
  category,
  authorName,
  className
}: {
  title: string
  slug: string
  category: Category
  authorName: string
  className?: string
}) => {
  return (
    <div className={clsx('flex flex-col sm:flex-row items-center', className)}>
      <span className="text-14 text-gray-700 mb-2 sm:mb-0 sm:mr-6">
        Compartir en
      </span>
      <div className="flex items-center space-x-4">
        <Link
          href={`https://twitter.com/intent/tweet?text=${title}&url=https://innkba.com/${getSectionSlug(
            category
          )}/${slug}`}
          passHref
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="share on twitter"
            className="text-black hover:text-violet transition-all duration-150"
          >
            <TwitterIcon />
          </a>
        </Link>
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=https://innkba.com/${getSectionSlug(
            category
          )}/${slug}`}
          passHref
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="share on facebook"
            className="text-black hover:text-violet transition-all duration-150"
          >
            <FacebookIcon />
          </a>
        </Link>
        <Link
          href={`https://api.whatsapp.com/send?text=Mirá el artículo que esribió ${authorName} en https://innkba.com/${getSectionSlug(
            category
          )}/${slug}`}
          passHref
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="share on whatsapp"
            className="text-black hover:text-violet transition-all duration-150"
          >
            <WhatsAppIcon />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Share
