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
  copy: string
  ctas: {
    label: string
    href: string
  }[]
}

const SectionHeader = ({ image, title, copy, ctas }: SectionHeaderProps) => {
  return (
    <div
      className={clsx(
        'w-full flex flex-col items-center lg:grid grid-cols-10 lg:px-28',
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
      <div className="flex flex-col mx-auto lg:mx-0 lg:col-start-6 lg:col-end-11 max-w-lg lg:max-w-xl lg:ml-16 lg:my-auto mb-12">
        <h1 className="text-22 sm:text-28 font-bold leading-tight">{title}</h1>
        <p className="mt-3 text-14 sm:text-15 font-medium mb-6 sm:mb-9 max-w-lg text-gray-800">
          {copy}
        </p>
        <div className="flex">
          {ctas.map((cta, idx) =>
            idx === 0 ? (
              <Button key={idx} href={cta.href}>
                {cta.label}
              </Button>
            ) : (
              <Button
                type="alternative"
                key={idx}
                href={cta.href}
                className="sm:ml-4"
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
