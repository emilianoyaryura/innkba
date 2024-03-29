import PageLayout from 'components/layout/pageLayout'
import {
  getAllAuthors,
  getAllStoriesPreview,
  getArtandLiteraturePosts,
  getLiteraturePage,
  getPostsPreview
} from 'lib/api'
import { AuthorPreview, Page, PostPreview, StoryPreview } from 'ts/models'
import SectionHeader from 'components/molecules/sectionHeader'
import PostGrid from 'components/molecules/postGrid'
import FullScreenPost from 'components/atoms/post/fullScreenPost'
import Section from 'components/molecules/section'
import Quote from 'components/atoms/quote'
import clsx from 'clsx'
import { getSectionSlug } from 'lib/utils/section'
import Image from 'next/image'
import bookDefaultImg from '../../../public/images/book.png'
import Link from 'next/link'

const ArteyLiteratura = ({
  posts,
  allPosts,
  page,
  allStories,
  authors
}: {
  posts: PostPreview[]
  allPosts: PostPreview[]
  allStories: StoryPreview[]
  authors: AuthorPreview[]
  page: Page
}) => {
  const sections = [
    ...new Set(posts.map((item) => item?.tag)) //New array with all years
  ]

  const tinyPosts = allPosts.map((p) => {
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
      headProps={{ title: 'Innk ba | Arte y Literatura' }}
    >
      <SectionHeader
        image={{
          src: page.header.illustration.src,
          title: page.header.illustration.label ?? 'Lifestyle Header Illo',
          width: page.header.illustration.width,
          height: page.header.illustration.height
        }}
        title={page.header.title}
        author={page.header.author}
        ctas={[
          {
            href: 'mailto:contacto@innkba.com?subject=Hola, quiero escribir en la sección de Arte y Literatura!',
            label: 'Escribí en Innk'
          },
          {
            href: '#lo-mas-destacado',
            label: 'Seguí leyendo'
          }
        ]}
      />
      <Section section="Lo mas destacado">
        <div>
          {page.featuredPosts && (
            <>
              <div className="hidden md:flex flex-col">
                <FullScreenPost
                  post={page.featuredPosts[0]}
                  className={clsx('', {
                    'mb-12': page.featuredPosts.length > 1
                  })}
                />
                <PostGrid
                  withoutMargins
                  id="LoMasDestacado"
                  posts={page.featuredPosts.slice(1, 10)}
                />
              </div>
              <div className="flex md:hidden flex-col">
                <PostGrid
                  withoutMargins
                  id="LoMasDestacado"
                  posts={page.featuredPosts}
                />
              </div>
            </>
          )}
        </div>
      </Section>
      {sections.slice(0, 1).map((section, idx) => (
        <Section key={idx} section={section}>
          <PostGrid
            withoutMargins
            id="LoMasDestacado"
            posts={posts.filter((p) => p.tag === section)}
          />
        </Section>
      ))}
      {allStories && (
        <Section section="Libros">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 sm:gap-y-10 lg:gap-y-16 gap-x-5 lg:gap-x-10">
            {allStories.map((s, idx) => (
              <Link href={`/arte-y-literatura/${s.slug}`} key={idx}>
                <a
                  className="cursor-pointer noDecoration flex flex-col"
                  aria-label="go to story"
                >
                  <Image
                    src={s.image.src ?? bookDefaultImg}
                    alt={s.image.title ?? s.title}
                    width={320}
                    height={270}
                    className="rounded-xl transition-all duration-150 group-hover:opacity-90"
                    objectFit="cover"
                  />
                  <p className="text-18 font-semibold mt-3">{s.title}</p>
                  {s.copy && (
                    <p className="mt-2 text-16 text-gray-700 ellipsis2">
                      {s.copy}
                    </p>
                  )}
                  <p className="text-gray-700 mt-3">
                    Por <b className="text-black">{s.author?.name}</b>
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </Section>
      )}
      {page.weeklyQuote && (
        <Quote
          className="-mb-28 md:-mb-32 lg:-mb-36"
          quote={page.weeklyQuote?.quote}
          author={page.weeklyQuote?.author}
        />
      )}
      {sections.slice(1, 10).map((section, idx) => (
        <Section key={idx} section={section}>
          <PostGrid
            withoutMargins
            id="LoMasDestacado"
            posts={posts.filter((p) => p.tag === section)}
          />
        </Section>
      ))}
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const posts = await getArtandLiteraturePosts()
  const page = await getLiteraturePage()
  const allPosts = await getPostsPreview()
  const allStories = await getAllStoriesPreview()
  const authors = await getAllAuthors()

  return {
    props: {
      posts: posts ?? null,
      page: page ?? null,
      allPosts: allPosts ?? null,
      allStories: allStories ?? null,
      authors: authors ?? null
    }
  }
}

export default ArteyLiteratura
