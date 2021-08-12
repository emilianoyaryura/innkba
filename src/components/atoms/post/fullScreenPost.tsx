import SectionLayout from 'components/layout/sectionLayout'
import { ContentfulPost } from 'ts/models'
import Image from 'next/image'
import Button from 'components/primitives/button'
import clsx from 'clsx'

type Props = {
  post: ContentfulPost
}

const FullScreenPost = ({ post }: Props) => {
  return (
    <SectionLayout>
      <div className="flex flex-col md:flex-row md:items-center">
        <Image
          src={post.image.src ?? ''}
          alt={post.image.title ?? post.title}
          width={560}
          height={420}
          className="rounded-xl"
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
          <h1 className="font-bold text-28 md:text-32 lg:text-38 leading-smooth md:leading-normal md:mt-3 mb-4 lg:mt-4 lg:mb-5">
            {post.title}
          </h1>
          <p className="mt-3 md:mt-0 mb-7 max-w-lg font-medium text-14 lg:text-16 md:mb-6 lg:mb-10 text-gray-400 md:max-w-md">
            {post.copy}
          </p>
          <Button href={post.slug} className="max-w-max">
            Seguir Leyendo
          </Button>
        </div>
      </div>
    </SectionLayout>
  )
}

export default FullScreenPost
