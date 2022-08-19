import clsx from 'clsx'
import Button from 'components/primitives/button'
import Image from 'next/image'
import s from './sectionHeader.module.css'

type SectionHeaderProps = {
  image: {
    src: string
    title?: string
    width?: number | string | undefined
    height?: number | string | undefined
  }
  title: string
  author?: string
  ctas: {
    label: string
    href: string
  }[]
}

const SectionHeader = ({ image, title, author, ctas }: SectionHeaderProps) => {
  return (
    <div
      className={clsx(
        'w-full -mt-8 sm:mt-12 lg:mt-0 max-w-screen-2xl mx-auto flex flex-col items-center lg:grid grid-cols-10 lg:px-28',
        s.container
      )}
    >
      <div className="lg:col-start-1 lg:col-end-6 max-w-lg lg:max-w-max">
        <Image
          src={image.src}
          alt={image.title ?? 'Section Header'}
          width={image.width ?? 700}
          height={image.height ?? 525}
        />
      </div>
      <div className="flex flex-col mx-auto items-center lg:items-start lg:mx-0 lg:col-start-6 lg:col-end-11 max-w-lg lg:max-w-xl lg:ml-16 lg:my-auto mb-12">
        <p className="mb-2 text-14 sm:text-15 font-medium text-gray-800 text-center lg:text-left">
          {author}
        </p>
        <h1 className="text-22 text-center lg:text-left sm:text-28 font-bold leading-tight mb-9">
          {title}
        </h1>
        <div className="flex">
          {ctas.map((cta, idx) =>
            idx === 0 ? (
              <Button type="tertiary" key={idx} href={cta.href}>
                {cta.label}
              </Button>
            ) : (
              <Button
                key={idx}
                href={cta.href}
                type="alternative"
                className="ml-4 sm:ml-6"
              >
                {cta.label}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default SectionHeader
