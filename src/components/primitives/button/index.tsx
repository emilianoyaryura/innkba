import { ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type Props = {
  type?: 'primary' | 'secondary' | 'tertiary' | 'alternative'
  children: ReactNode
  href?: string
  isExternal?: boolean
  className?: string
  size?: 'small' | 'medium' | 'large'
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Button = ({
  type = 'primary',
  size = 'medium',
  children,
  href,
  isExternal = false,
  className,
  onClick
}: Props) => {
  return (
    <div
      onClick={onClick}
      style={{ minWidth: '135px' }}
      className={clsx(
        'rounded-lg flex items-center justify-center font-semibold text-14 cursor-pointer text-center transition-all duration-150',
        className,
        {
          'bg-blue hover:opacity-90 group-hover:opacity-90 text-white':
            type === 'primary',
          'bg-black hover:opacity-90 text-white': type === 'secondary',
          'bg-gray-100 hover:opacity-70 text-black': type === 'tertiary',
          'bg-transparent text-black hover:opacity-80': type === 'alternative',
          'px-8 py-4': size === 'medium' && type !== 'alternative',
          'px-8 py-3': size === 'small' && type !== 'alternative'
        }
      )}
    >
      {!isExternal && href ? (
        <Link href={href}>
          <a aria-label="internal button" className="noDecoration">
            {children}
          </a>
        </Link>
      ) : isExternal && href ? (
        <Link href={href} passHref>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="external button"
            className="noDecoration"
          >
            {children}
          </a>
        </Link>
      ) : (
        <button
          aria-label="no link button"
          className="flex items-center justify-center noDecoration"
        >
          {children}
        </button>
      )}
    </div>
  )
}

export default Button
