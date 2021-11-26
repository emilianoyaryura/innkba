import clsx from 'clsx'
import { ReactNode } from 'react'
import Container from '../container'

type Props = {
  title?: string
  children: ReactNode
  copy?: string
  classname?: string
  colCenter?: boolean
  rowCenter?: boolean
}

const SectionLayout = ({
  title,
  children,
  copy,
  classname,
  colCenter,
  rowCenter
}: Props) => {
  return (
    <Container size="large" className={clsx('mb-28 flex flex-col', classname)}>
      {title && (
        <h1 className="text-28 sm:text-34 font-bold leading-normal">{title}</h1>
      )}
      {copy && (
        <p className="text-14 sm:text-16 mt-2 max-w-lg text-gray-700 font-medium">
          {copy}
        </p>
      )}
      <div
        className={clsx('', {
          'mt-8': title !== undefined || title !== null,
          'flex flex-col items-center': colCenter,
          'flex items-center': rowCenter
        })}
      >
        {children}
      </div>
    </Container>
  )
}

export default SectionLayout
