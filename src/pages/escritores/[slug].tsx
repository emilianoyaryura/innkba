// import AuthorSocial from 'components/atoms/author-social'
import Container from 'components/layout/container'
import PageLayout from 'components/layout/pageLayout'
import PostGrid from 'components/molecules/postGrid'
import { getAllAuthors, getPostsPreview, getSingleAuthor } from 'lib/api'
import { getSectionSlug } from 'lib/utils/section'
import Image from 'next/image'
import { Author, AuthorPreview, PostPreview } from 'ts/models'
import { supabase } from 'lib/supabase-client'
import EyeIcon from 'components/atoms/icons/eye'
import { useCallback, useEffect, useState } from 'react'

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
        description: 'Escritor',
        ogImage: ogImage
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center mb-14">
        <div className="w-full flex flex-col">
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
          <div className="flex items-center self-end mt-2 mr-2 text-gray-800">
            <EyeIcon />
            <p>{views}</p>
          </div>
        </div>
        <div className="rounded-full p-1 w-32 h-32 -mt-24 bg-white">
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
          <p className="text-16 text-center mt-2 text-gray-700 max-w-md">
            {author.shortDescription}
          </p>
          {/* <AuthorSocial author={author} className="mx-auto mt-6" /> */}
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

  return {
    props: {
      posts: posts ?? null,
      authors: authors ?? null,
      author: author[0] ?? null
    }
  }
}

export default WriterPage
