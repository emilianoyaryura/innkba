import PageLayout from 'components/layout/pageLayout'
import { getAllStories, getPosts } from 'lib/api'
import { useRouter } from 'next/router'
import { ContentfulPost, ShortStory, Story } from 'ts/models'
import Container from 'components/layout/container'
import Link from 'next/link'
import Image from 'next/image'
import { getDate } from 'lib/utils/date'
import Share from 'components/atoms/share'
import clsx from 'clsx'
import { renderBody } from 'lib/renderer'
import PostAuthor from 'components/atoms/author'
import s from './chapter.module.css'

const ChapterPage = ({
  stories,
  posts
}: {
  stories: Story[]
  posts: ContentfulPost[]
}) => {
  const router = useRouter()
  const query = router.query
  const story = stories?.filter((s) => s.slug === query.slug)[0]
  const chapter = story.chapters.filter((c) => c.slug === query.chapter)[0]
  const keepReadingChapters = story.chapters.filter(
    (c) => c.slug !== chapter.slug
  )

  return (
    <PageLayout
      posts={posts}
      headProps={{
        title: story?.title,
        ogImage: story?.image.src ?? 'https://innkba.com/og.png'
      }}
    >
      <Container size="small">
        <div className="mt-10 sm:mt-16">
          <h1 className="text-28 sm:text-32 font-medium">{chapter.title}</h1>
          <div className="flex flex-col sm:flex-row sm:justify-between pt-3 sm:pt-2 mt-2 border-t border-solid border-gray-300">
            <p className="text-14 text-gray-600 flex items-center">
              <span>{getDate(chapter.date)}</span>
              <span className="mx-2">-</span>
              <span>{story.author.name}</span>
            </p>
            <Link href={`/arte-y-literatura/${story.slug}`}>
              <a className="text-14 text-violet mt-2 sm:mt-0">{story.title}</a>
            </Link>
          </div>
          {chapter.image?.src && (
            <div className="mt-5 sm:mt-8">
              <Image
                width={900}
                height={520}
                src={chapter.image.src ?? ''}
                objectFit="cover"
                className="rounded-xl sm:rounded-2xl"
              />
            </div>
          )}
        </div>
        <Share
          title={chapter.title}
          slug={chapter.slug}
          authorName={story.author.name}
          category="Arte y Literatura"
          className={clsx('justify-end', {
            'mt-3': chapter.image?.src,
            'mt-8': !chapter.image?.src
          })}
        />
        <div className={clsx('mt-8 sm:mt-12 md:mt-16 max-w-2xl mx-auto')}>
          {renderBody(chapter.content, false)}
          <PostAuthor author={[story.author]} />
        </div>
        {keepReadingChapters && (
          <div className="mt-32">
            <p className="text-26 text-center sm:text-left sm:text-32 font-medium mb-8 sm:mb-5">
              <span>M??s de</span>
              <span className={s.keepReading}>{story.title}</span>
            </p>
            <div className="flex flex-col mt-5">
              {story.chapters.map((c, idx) => (
                <Link
                  key={idx}
                  href={`/arte-y-literatura/${story.slug}/${c.slug}`}
                >
                  <a className="noDecoration transition-all transform hover:translate-x-4 duration-150 py-5 border-b border-solid border-gray-400">
                    <p className="text-18 lg:text-22 inline-flex">
                      <span
                        className={clsx(
                          'border h-8 w-8 flex items-center justify-center rounded-full',
                          {
                            'border-solid border-black text-black':
                              c.slug !== chapter.slug,
                            'border-dashed border-green text-green':
                              c.slug === chapter.slug
                          }
                        )}
                      >
                        {idx + 1}
                      </span>
                      <span className="ml-6 font-medium">{c.title}</span>
                    </p>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </PageLayout>
  )
}

export const getStaticPaths = async () => {
  const stories = await getAllStories()

  const chapters = stories.map((s) => s.chapters.map((c: ShortStory) => c.slug))
  const allChaptersSlug = [].concat(...chapters).map((each) => each as string)

  const slugs = allChaptersSlug.map((chapter) => {
    return {
      params: {
        slug: stories.filter((s) =>
          s.chapters.some((c: ShortStory) => c.slug === chapter)
        )[0].slug as string,
        chapter: chapter as string
      }
    }
  })

  const paths = slugs
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async () => {
  const stories = await getAllStories()
  const posts = await getPosts()

  return {
    props: {
      stories: stories ?? null,
      posts: posts ?? null
    }
  }
}

export default ChapterPage
