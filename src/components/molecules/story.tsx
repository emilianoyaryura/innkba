import SectionLayout from 'components/layout/sectionLayout'
import { Story as StoryProps } from 'ts/models'
import Image from 'next/image'
import Link from 'next/link'

const Story = ({ story }: { story: StoryProps }) => {
  return (
    <SectionLayout title={story.title} copy={story.copy ?? ''}>
      <p className="-mt-6 text-14 sm:text-16 text-gray-700 font-medium mb-8">
        Por <b className="text-black">{story.author.name}</b>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="hidden md:flex flex-col justify-between py-6">
          {story.chapters.map((post, idx) => (
            <Link href={post.slug} key={idx}>
              <a className="flex noDecoration hover:opacity-90 transition-all duration-150">
                <Image
                  width={100}
                  height={100}
                  className="rounded-xl"
                  objectFit="cover"
                  src={post.image.src ?? '/images/fallback.png'}
                  alt={post.title}
                />
                <p className="text-18 font-medium ml-4 mt-2">
                  {idx + 1}. {post.title}
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
          objectFit="cover"
        />
        <div className="flex md:hidden">
          <div className="grid mt-10 grid-cols-2 gap-y-10 gap-x-5 lg:gap-x-10 justify-items-center w-full">
            {story.chapters.map((post, idx) => (
              <Link href={post.slug} key={idx}>
                <a className="flex flex-col sm:flex-row noDecoration">
                  <Image
                    width={200}
                    height={120}
                    className="rounded-xl"
                    objectFit="cover"
                    src={post.image.src ?? '/images/fallback.png'}
                    alt={post.title}
                  />
                  <p className="text-16 sm:text-18 font-medium sm:ml-4 mt-2">
                    {idx + 1}. {post.title}
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
