import clsx from 'clsx'
import { LegacyRef } from 'react'
import { ReactNode } from 'react'

const Container = ({
  size,
  children,
  ref,
  withoutPadding = false,
  className
}: {
  size: 'small' | 'medium' | 'large'
  children: ReactNode
  className?: string
  withoutPadding?: boolean
  ref?: LegacyRef<HTMLDivElement> | undefined
}) => {
  return (
    <div
      ref={ref}
      className={clsx(className, 'w-full mx-auto', {
        'max-w-7xl': size === 'large',
        'max-w-5xl': size === 'medium',
        'max-w-4xl': size === 'small',
        'px-4': !withoutPadding
      })}
    >
      {children}
    </div>
  )
}

export default Container
