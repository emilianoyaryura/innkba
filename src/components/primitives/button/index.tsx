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
  ...restProps
}: Props) => {
  return (
    <button
      {...restProps}
      style={{ minWidth: '135px' }}
      className={clsx(
        'rounded-lg font-semibold text-14 cursor-pointer text-center transition-all duration-150',
        className,
        {
          'bg-blue hover:opacity-90 group-hover:opacity-90 text-white':
            type === 'primary',
          'bg-black hover:opacity-90 text-white': type === 'secondary',
          'bg-gray-100 hover:opacity-70 text-black': type === 'tertiary',
          'bg-transparent text-black font-semibold hover:text-violet':
            type === 'alternative',
          'px-9 py-4': size === 'medium',
          'px-9 py-3': size === 'small'
        }
      )}
    >
      {!isExternal && href ? (
        <Link href={href}>
          <a className="noDecoration">{children}</a>
        </Link>
      ) : isExternal && href ? (
        <Link href={href} passHref>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="noDecoration"
          >
            {children}
          </a>
        </Link>
      ) : (
        <a className="flex items-center justify-center noDecoration">
          {children}
        </a>
      )}
    </button>
  )
}

export default Button
