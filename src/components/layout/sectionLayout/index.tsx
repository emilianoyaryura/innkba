import clsx from 'clsx'
import { ReactNode } from 'react'
import Container from '../container'

type Props = {
  title?: string
  children: ReactNode
  copy?: string
  classname?: string
}

const SectionLayout = ({ title, children, copy, classname }: Props) => {
  return (
    <Container size="large" className={clsx('mt-28 flex flex-col', classname)}>
      {title && (
        <h1 className="text-28 sm:text-38 font-bold leading-normal">{title}</h1>
      )}
      {copy && (
        <p className="text-14 sm:text-16 mt-2 max-w-lg text-gray-700 font-medium">
          {copy}
        </p>
      )}
      <div
        className={clsx('', {
          'mt-10 sm:mt-12': title !== undefined || title !== null
        })}
      >
        {children}
      </div>
    </Container>
  )
}

export default SectionLayout
