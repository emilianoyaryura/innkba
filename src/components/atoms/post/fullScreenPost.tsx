import SectionLayout from 'components/layout/sectionLayout'
import { ContentfulPost } from 'ts/models'
import Image from 'next/image'
import Button from 'components/primitives/button'
import clsx from 'clsx'
import { getSectionSlug } from 'lib/utils/section'
import s from './bigPost/bigPost.module.css'
import Link from 'next/link'

type Props = {
  post: ContentfulPost
}

const FullScreenPost = ({ post }: Props) => {
  const section = getSectionSlug(post.category)
  return (
    <Link href={`/${section}/${post.slug}`}>
      <SectionLayout classname="cursor-pointer">
        <div className="flex flex-col md:flex-row md:items-center group">
          <Image
            src={post.image.src ?? ''}
            alt={post.image.title ?? post.title}
            width={560}
            height={420}
            className="rounded-xl transition-all duration-150 group-hover:opacity-90"
          />
          <div className="md:ml-5 lg:ml-8">
            <p
              className={clsx(
                'text-16 mt-6 md:mt-0 mb-3 md:mb-0 md:text-14 lg:text-16 font-semibold capitalize',
                {
                  'text-blue': post.category === 'Lifestyle',
                  'text-yellow': post.category === 'Arte',
                  'text-green': post.category === 'Cultura',
                  'text-violet': post.category === 'Literatura',
                  'text-red': post.category === 'Viajes'
                }
              )}
            >
              {post.category}
            </p>
            <h1 className="font-bold text-26 md:text-28 lg:text-30 leading-smooth md:leading-normal md:mt-3 mb-4 lg:mt-4 lg:mb-5">
              {post.title}
            </h1>
            <p
              className={clsx(
                'mt-3 md:mt-0 mb-7 max-w-lg font-medium text-14 lg:text-16 md:mb-6 lg:mb-10 text-gray-600 md:max-w-md',
                s.copy
              )}
            >
              {post.copy}
            </p>
            <Button className="max-w-max">Seguir Leyendo</Button>
          </div>
        </div>
      </SectionLayout>
    </Link>
  )
}

export default FullScreenPost
