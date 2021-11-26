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
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
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
    <button
      onClick={onClick}
      style={{ minWidth: type !== 'alternative' ? '120px' : '' }}
      className={clsx(
        'rounded-lg flex items-center justify-center font-semibold text-14 cursor-pointer text-center transition-all duration-150',
        className,
        {
          'bg-blue hover:opacity-90 group-hover:opacity-90 text-white':
            type === 'primary',
          'bg-black border border-solid border-black hover:bg-transparent text-white hover:text-black':
            type === 'secondary',
          'bg-gray-100 hover:opacity-70 text-black': type === 'tertiary',
          'bg-transparent text-black hover:opacity-80': type === 'alternative',
          'px-7 py-4': size === 'medium' && type !== 'alternative',
          'px-6 py-3': size === 'small' && type !== 'alternative'
        }
      )}
    >
      {!isExternal && href ? (
        <Link href={href}>
          <a
            aria-label="internal button"
            className="noDecoration font-semibold"
          >
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
            className="noDecoration font-semibold"
          >
            {children}
          </a>
        </Link>
      ) : (
        <a
          aria-label="no link button"
          className="flex items-center justify-center noDecoration font-semibold"
        >
          {children}
        </a>
      )}
    </button>
  )
}

export default Button
