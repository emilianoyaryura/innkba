import Button from 'components/primitives/button'
import Image from 'next/image'

type SectionHeaderProps = {
  image: {
    src: string
    title?: string
    width?: number
    height?: number
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
    <div className="grid grid-cols-10 p-28">
      <div className="col-start-1 col-end-6">
        <Image
          src={image.src}
          alt={image.title ?? 'Section Header'}
          width={image.width ?? 700}
          height={image.height ?? 525}
        />
      </div>
      <div className="flex flex-col col-start-6 col-end-11 max-w-xl ml-16 my-auto">
        <h1 className="text-28 font-bold leading-tight">{title}</h1>
        <p className="mt-3 text-15 font-medium mb-9 max-w-lg text-gray-800">
          {copy}
        </p>
        <div className="flex">
          {ctas.map((cta, idx) =>
            idx === 0 ? (
              <Button key={idx} href={cta.href}>
                {cta.label}
              </Button>
            ) : (
              <Button type="alternative" key={idx} href={cta.href}>
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
