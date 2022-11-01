import Container from 'components/layout/container'
import PageLayout from 'components/layout/pageLayout'
import PostGrid from 'components/molecules/postGrid'
import {
  getAllAuthors,
  getAllStoriesPreview,
  getPostsPreview,
  getSingleAuthor
} from 'lib/api'
import { getSectionSlug } from 'lib/utils/section'
import Image from 'next/image'
import { Author, AuthorPreview, PostPreview } from 'ts/models'
import { supabase } from 'lib/supabase-client'
import EyeIcon from 'components/atoms/icons/eye'
import { useCallback, useEffect, useRef, useState } from 'react'
import AuthorSocial from 'components/atoms/author-social'
import clsx from 'clsx'
import Link from 'next/link'
import TwitterIcon from 'components/atoms/icons/twitter'
import FacebookIcon from 'components/atoms/icons/facebook'
import WhatsAppIcon from 'components/atoms/icons/whatsapp'

const WriterPage = ({
  author,
  posts,
  authors
}: {
  author: Author
  posts: PostPreview[]
  authors: AuthorPreview[]
}) => {
  const [views, setViews] = useState<null | number>(null)
  const [shareOpen, setShareOpen] = useState(false)
  const shareRef = useRef(null)

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      // @ts-ignore
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShareOpen(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [shareRef])

  const tinyPosts = posts?.map((p) => {
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

  const authorPosts = posts.filter((e) => e.author.name === author.name)

  const authorPostsSlug = authorPosts?.map((e) => e.slug)

  const handleViews = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('Page Views')
        .select('slug, views')
        .filter('slug', 'in', `(${authorPostsSlug})`)
      try {
        // @ts-ignore
        const sum = data
          ?.map((e) => e.views)
          .reduce((partialSum, a) => partialSum + a, 0)
        setViews(sum)
        console.log(data)
      } catch (err) {
        console.log(err, 'error')
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }, [authorPostsSlug])

  useEffect(() => {
    handleViews()
  }, [handleViews])

  const ogImage = author?.image ? author.image : '/og.png'

  return (
    <PageLayout
      posts={searcher}
      headProps={{
        title: `Innk ba | ${author?.name}`,
        description:
          'Escribo en Innk ba. Revista digital. Nuevo espacio. Nuevas ideas.',
        ogImage: ogImage
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center mb-14">
        <div className="w-full flex flex-col">
          {author.name === 'Innk ba' ? (
            <div className="w-full h-40 sm:h-48 md:h-64 bg-black lg:rounded-2xl overflow-hidden">
              <div className="hidden sm:flex w-full h-full relative">
                <Image
                  src="/images/escribi-lo-que-quieras.png"
                  alt="escribi lo que quieras"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          ) : (
            <div
              className="w-full h-40 sm:h-48 md:h-64 lg:rounded-2xl"
              style={{
                backgroundColor:
                  author?.background === 'violet'
                    ? '#6C63FF'
                    : author?.background === 'blue'
                    ? '#2E8AF6'
                    : author?.background === 'yellow'
                    ? '#F9A826'
                    : author?.background === 'red'
                    ? '#FF4747'
                    : '#CECECE'
              }}
            />
          )}
          <div className="flex items-center justify-between mt-2 px-2">
            <button
              aria-label="share button"
              className="text-gray-800 relative focus:outline-none"
              onClick={() => setShareOpen(true)}
              ref={shareRef}
            >
              Compartir
              {shareOpen && (
                <div className="absolute left-0 border-2 border-solid border-black rounded px-6 py-5 flex flex-col space-y-3 bg-white z-10 -top-8">
                  <Link
                    href={`https://twitter.com/intent/tweet?text=${author.name}&url=https://innkba.com/escritores/${author.slug}`}
                    passHref
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="share on twitter"
                      className="text-black hover:text-violet transition-all duration-150"
                    >
                      <TwitterIcon />
                    </a>
                  </Link>
                  <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://innkba.com/escritores/${author.slug}`}
                    passHref
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="share on facebook"
                      className="text-black hover:text-violet transition-all duration-150"
                    >
                      <FacebookIcon />
                    </a>
                  </Link>
                  <Link
                    href={`https://api.whatsapp.com/send?text=Mirá el perfil de ${author.name} en https://innkba.com/escritores/${author.slug}`}
                    passHref
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="share on whatsapp"
                      className="text-black hover:text-violet transition-all duration-150"
                    >
                      <WhatsAppIcon />
                    </a>
                  </Link>
                </div>
              )}
            </button>
            <div className="flex items-center text-gray-800">
              <EyeIcon />
              <p>{views}</p>
            </div>
          </div>
        </div>
        <div className="rounded-full p-1 w-32 h-32 -mt-24 bg-white z-10">
          {author?.image ? (
            <Image
              alt={author?.name}
              src={author?.image}
              objectFit="cover"
              width={128}
              height={128}
              className="rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white text-42 font-bold">
              ?
            </div>
          )}
        </div>
        <div className="mt-2 px-4 flex flex-col items-center">
          <p className="text-22 font-medium">{author?.name}</p>
          <p
            className={clsx('text-16 text-center mt-2 text-gray-700', {
              'max-w-md': author.shortDescription.length < 80,
              'max-w-xl': author.shortDescription.length >= 80
            })}
          >
            {author.shortDescription}
          </p>
          <AuthorSocial author={author} className="mx-auto mt-6" />
        </div>
      </div>
      <Container size="large">
        <PostGrid id="" posts={authorPosts} />
      </Container>
    </PageLayout>
  )
}

export const getStaticPaths = async () => {
  const authors = await getAllAuthors()
  const paths = authors?.map((each: any) => ({
    params: { slug: each.slug as string }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }: { params: any }) => {
  const { slug } = params

  const posts = await getPostsPreview()
  const authors = await getAllAuthors()
  const author = await getSingleAuthor(slug)
  const stories = await getAllStoriesPreview()

  const authorStories = stories.filter((s) => s.author.name === author[0].name)

  return {
    props: {
      // @ts-ignore
      posts: posts.concat(authorStories) ?? null,
      authors: authors ?? null,
      author: author[0] ?? null
    }
  }
}

export default WriterPage
