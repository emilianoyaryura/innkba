import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { PostPreview } from '.'

const HorizontalPost = ({ image, link, category, title }: PostPreview) => {
  return (
    <div className="flex">
      <Image
        src={image.src}
        alt={image.title}
        width={140}
        height={140}
        className="rounded-xl"
        objectFit="cover"
      />
      <div className="ml-3 lg:ml-8">
        <p
          className={clsx('mb-2 text-14 font-semibold capitalize', {
            'text-blue': category === 'lifestyle',
            'text-yellow': category === 'arte',
            'text-green': category === 'cultura',
            'text-violet': category === 'literatura',
            'text-red': category === 'viajes'
          })}
        >
          {category}
        </p>
        <p className="text-18 font-semibold max-w-sm md:leading-smooth lg:leading-tight">
          {title}
        </p>
        <Link href={link}>
          <div className="mt-4 max-w-max cursor-pointer">
            <span className="text-14 mb-1 font-semibold">Keep Reading</span>
            <div className="h-px w-full bg-black" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default HorizontalPost
