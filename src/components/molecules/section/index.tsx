import Container from 'components/layout/container'
import { ReactNode } from 'react'

const Section = ({
  section,
  children
}: {
  section: string
  children: ReactNode
}) => {
  return (
    <div
      id={section.toLocaleLowerCase()}
      className="flex flex-col -mb-20 pt-28 md:pt-32 lg:pt-36"
    >
      <Container size="large" className="flex flex-col mb-6">
        <p className="text-15 sm:text-16 uppercase font-bold mb-2">{section}</p>
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(0, 0, 0, 0.5)'
          }}
        />
      </Container>
      {children}
    </div>
  )
}

export default Section
