import clsx from 'clsx'
import { ReactNode } from 'react'

const Container = ({
  size,
  children,
  className
}: {
  size: 'small' | 'medium' | 'large'
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={clsx(className, 'w-full mx-auto px-4', {
        'max-w-7xl': size === 'large',
        'max-w-5xl': size === 'medium',
        'max-w-4xl': size === 'small'
      })}
    >
      {children}
    </div>
  )
}

export default Container
