import { ReactNode, useCallback } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'

type Props = {
  type?: 'primary' | 'secondary' | 'tertiary' | 'alternative' | 'custom'
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
  // isExternal = false,
  className,
  onClick
}: Props) => {
  const router = useRouter()

  const handleClick = useCallback(() => {
    if (onClick === undefined) {
      router.push(href ?? '/')
    } else onClick
  }, [href, onClick, router])
  return (
    <button
      onClick={handleClick}
      style={{ minWidth: type !== 'alternative' ? '120px' : '' }}
      className={clsx(
        'rounded-lg flex items-center justify-center font-semibold text-14 cursor-pointer text-center transition-all duration-150 outline-none',
        className,
        {
          'bg-blue hover:opacity-90 group-hover:opacity-90 text-white':
            type === 'primary',
          'bg-black border border-solid border-black hover:bg-transparent text-white hover:text-black':
            type === 'secondary',
          'bg-gray-100 hover:opacity-70 text-black': type === 'tertiary',
          'bg-transparent text-black hover:opacity-80': type === 'alternative',
          'border-2 border-solid': type === 'custom',
          'px-7 py-4': size === 'medium' && type !== 'alternative',
          'px-6 py-3': size === 'small' && type !== 'alternative'
        }
      )}
    >
      {children}
    </button>
  )
}

export default Button
