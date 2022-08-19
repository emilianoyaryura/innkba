import { Story as StoryProps } from 'ts/models'
import Image from 'next/image'
import Link from 'next/link'
import Button from 'components/primitives/button'
import Container from 'components/layout/container'

const Story = ({ story }: { story: StoryProps }) => {
  return (
    <div className="px-4">
      <Container
        size="large"
        className="my-36 bg-gray-50 border border-solid border-gray-200 grid grid-cols-1 lg:grid-cols-2 gap-12 box-border px-8 py-16 sm:px-16 rounded-2xl"
      >
        <div className="flex flex-col justify-between">
          <Link href="/arte-y-literatura">
            <a
              aria-label="Story - Arte y Literatura"
              className="uppercase text-yellow text-14 font-bold"
            >
              Arte y literatura
            </a>
          </Link>
          <h1 className="mt-5 text-22 sm:text-28 font-bold leading-normal">
            {story.title}
          </h1>
          <p className="mt-3">
            Por <b>{story.author.name}</b>
          </p>
          <p className="mt-3 text-gray-700 text-15 sm:text-16">{story.copy}</p>
          <Button
            type="custom"
            className="hidden lg:flex border-yellow text-yellow hover:bg-yellow hover:text-white mt-12 max-w-max"
            href={`/arte-y-literatura/${story.slug}`}
          >
            Leer más
          </Button>
        </div>
        <div className="justify-items-center mx-auto self-center">
          <Image
            src={story.image.src ?? ''}
            alt={story.image.title}
            width={500}
            height={300}
            objectFit="contain"
          />
          <Button
            type="custom"
            className="flex lg:hidden border-yellow text-yellow hover:bg-yellow hover:text-white mt-12 max-w-max focus:outline-yellow"
            href={`/arte-y-literatura/${story.slug}`}
          >
            Leer más
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default Story
