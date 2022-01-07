import PageLayout from 'components/layout/pageLayout'
import { getAllStories, getPosts } from 'lib/api'
import { useRouter } from 'next/router'
import { ContentfulPost, ShortStory, Story } from 'ts/models'
import Container from 'components/layout/container'
import Link from 'next/link'
import { getDate } from 'lib/utils/date'

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
  return (
    <PageLayout
      posts={posts}
      headProps={{
        title: story?.title,
        ogImage: story?.image.src ?? 'https://innkba.com/og.png'
      }}
    >
      <Container size="small">
        <div className="mt-16">
          <h1 className="text-32 font-medium">{chapter.title}</h1>
          <div className="flex justify-between pt-2 mt-2 border-t border-solid border-gray-300">
            <p className="text-14 text-gray-600 flex items-center">
              <span>{getDate(chapter.date)}</span>
              <span className="mx-2">-</span>
              <span>{story.author.name}</span>
            </p>
            <Link href={`/arte-y-literatura/${story.slug}`}>
              <a className="text-14 text-violet">{story.title}</a>
            </Link>
          </div>
        </div>
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
