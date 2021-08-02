import clsx from 'clsx'
import { ReactNode } from 'react'
import Container from '../container'

type Props = {
  title?: string
  children: ReactNode
  copy?: string
}

const SectionLayout = ({ title, children, copy }: Props) => {
  return (
    <Container size="large" className="mt-28 flex flex-col">
      {title && <h1 className="text-38 font-bold">{title}</h1>}
      {copy && (
        <p className="text-16 mt-2 max-w-lg text-gray-700 font-medium">
          {copy}
        </p>
      )}
      <div
        className={clsx('', {
          'mt-10': title !== undefined || title !== null
        })}
      >
        {children}
      </div>
    </Container>
  )
}

export default SectionLayout
