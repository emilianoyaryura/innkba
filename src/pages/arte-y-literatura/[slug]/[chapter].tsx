import PageLayout from 'components/layout/pageLayout'
import { getAllAuthors, getAllStories, getPosts } from 'lib/api'
import { useRouter } from 'next/router'
import { AuthorPreview, PostPreview, ShortStory, Story } from 'ts/models'
import Container from 'components/layout/container'
import Link from 'next/link'
import Image from 'next/image'
import { getDate } from 'lib/utils/date'
import Share from 'components/atoms/share'
import clsx from 'clsx'
import { renderBody } from 'lib/renderer'
import PostAuthor from 'components/atoms/author'
import s from './chapter.module.css'
import { getSectionSlug } from 'lib/utils/section'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from 'lib/supabase-client'

const ChapterPage = ({
  stories,
  posts,
  authors
}: {
  stories: Story[]
  authors: AuthorPreview[]
  posts: PostPreview[]
}) => {
  const [views, setViews] = useState<null | number>(null)
  const router = useRouter()
  const query = router.query

  const story = stories?.filter((s) => s.slug === query.slug)[0]
  const chapter = story.chapters.filter((c) => c.slug === query.chapter)[0]
  const keepReadingChapters = story.chapters.filter(
    (c) => c.slug !== chapter.slug
  )

  console.log(views)

  const handleViews = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('Page Views')
        .select()
        .eq('slug', `${story.slug}/${chapter.slug}`)
      try {
        // @ts-ignore
        if (data?.length < 1 || !data) {
          const a = await supabase
            .from('Page Views')
            .insert({ slug: `${story.slug}/${chapter.slug}`, views: 1 })
          const b = setViews(1)
          return a && b
        } else {
          const views = data[0]?.views
          const a = await supabase
            .from('Page Views')
            .update({ slug: `${story.slug}/${chapter.slug}`, views: views + 1 })
          const b = setViews(views + 1)
          return a && b
        }
      } catch (err) {
        console.log(err, 'error')
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }, [query])

  useEffect(() => {
    handleViews()
  }, [handleViews])

  const tinyPosts = posts.map((p) => {
    const section = getSectionSlug(p.category)
    return {
      title: p.title,
      href: `/${section}/${p.slug}`,
      category: p.category,
      tag: p.tag
    }
  })

  const authorsSearcher = authors?.map((au) => {
    return {
      title: au.name,
      href: `/escritores/${au.slug}`,
      category: 'Escritores',
      tag: ''
    }
  })

  // @ts-ignore
  const searcher = tinyPosts?.concat(authorsSearcher)

  return (
    <PageLayout
      posts={searcher}
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
          {renderBody(chapter.content, false, '', chapter.center)}
          <PostAuthor author={[story.author]} />
        </div>
        {keepReadingChapters && (
          <div className="mt-32">
            <p className="text-26 text-center sm:text-left sm:text-32 font-medium mb-8 sm:mb-5">
              <span>Más de</span>
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
  const authors = await getAllAuthors()

  return {
    props: {
      stories: stories ?? null,
      posts: posts ?? null,
      authors: authors ?? null
    }
  }
}

export default ChapterPage
