import SectionLayout from 'components/layout/sectionLayout'
import { Story as StoryProps } from 'ts/models'
import Image from 'next/image'
import Link from 'next/link'
import Button from 'components/primitives/button'

const Story = ({ story }: { story: StoryProps }) => {
  return (
    <SectionLayout title={story.title} copy={story.copy ?? ''}>
      <div className="flex flex-col -mt-6 -mb-4 sm:mb-8">
        <p className="text-14 sm:text-16 text-gray-700 font-medium mb-3">
          Por <b className="text-black">{story.author.name}</b>
        </p>
        <Button
          type="alternative"
          className="max-w-max group"
          href={`/arte-y-literatura/${story.slug}`}
        >
          <span className="group-hover:text-violet transition-all duration-150">
            {`-->`} Ver más
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-4 md:gap-10">
        <div className="hidden md:flex flex-col justify-between py-6">
          {story.chapters.map((chapter, idx) => (
            <Link
              href={`arte-y-literatura/${story.slug}/${chapter.slug}`}
              key={idx}
            >
              <a className="flex noDecoration hover:opacity-90 transition-all duration-150 max-w-max">
                <Image
                  width={100}
                  height={100}
                  className="rounded-xl"
                  objectFit="cover"
                  src={chapter.image.src ?? '/images/fallback.png'}
                  alt={chapter.title}
                />
                <p className="text-18 font-medium ml-4 mt-2">
                  {idx + 1}. {chapter.title}
                </p>
              </a>
            </Link>
          ))}
        </div>
        <Image
          src={story.image.src ?? '/images/fallback.png'}
          alt={story.title}
          height={540}
          width={414}
          className="rounded-xl"
          // objectFit="cover"
        />
        <div className="flex md:hidden">
          <div className="grid -mt-4 sm:mt-2 grid-cols-2 gap-y-10 gap-x-5 lg:gap-x-10 justify-items-center w-full">
            {story.chapters.map((chapter, idx) => (
              <Link href={chapter.slug} key={idx}>
                <a className="flex flex-col sm:flex-row noDecoration">
                  <Image
                    width={200}
                    height={120}
                    className="rounded-xl"
                    objectFit="cover"
                    src={chapter.image.src ?? '/images/fallback.png'}
                    alt={chapter.title}
                  />
                  <p className="text-16 sm:text-18 font-medium sm:ml-4 mt-2">
                    {idx + 1}. {chapter.title}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default Story
