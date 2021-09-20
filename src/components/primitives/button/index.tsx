import { ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type Props = {
  type?: 'primary' | 'secondary' | 'tertiary'
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
  ...restProps
}: Props) => {
  return (
    <div
      {...restProps}
      className={clsx(
        'rounded-lg text-white font-semibold text-14 cursor-pointer text-center transition-all duration-150',
        className,
        {
          'bg-blue hover:opacity-95': type === 'primary',
          'bg-black hover:opacity-95': type === 'secondary',
          'px-9 py-4': size === 'medium',
          'px-9 py-3': size === 'small'
        }
      )}
    >
      {!isExternal && href ? (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      ) : isExternal && href ? (
        <Link href={href} passHref>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        </Link>
      ) : (
        <div>{children}</div>
      )}
    </div>
  )
}

export default Button
