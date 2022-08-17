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
      id={section.toLocaleLowerCase().replace(/ /g, '-')}
      className="flex flex-col mb-5 pt-28 md:pt-32 lg:pt-36"
    >
      <Container size="large" className="flex flex-col">
        <p className="text-15 sm:text-16 uppercase font-bold mb-2">{section}</p>
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(0, 0, 0, 0.1)'
          }}
        />
        <div className="mt-12 sm:mt-16">{children}</div>
      </Container>
    </div>
  )
}

export default Section
