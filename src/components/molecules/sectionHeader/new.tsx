import Container from 'components/layout/container'
import Link from 'next/link'

type SectionProps = {
  title: string
  tags: {
    label: string
    link: string
  }[]
}

const SectionHeader = ({ section }: { section: SectionProps }) => {
  return (
    <Container size="large">
      <div
        className="flex justify-between"
        style={{ height: 'calc(100vh - 260px)' }}
      >
        <div className="flex flex-col pt-20">
          <h1 className="text-60 uppercase font-bold tracking-tight">
            {section.title}
          </h1>
          <div className="flex flex-wrap">
            {section.tags.map((tag) => (
              <Link href={`#${tag.link}`} key={tag.label}>
                <a aria-label={tag.label}>{tag.label}</a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SectionHeader
