import AuthorSocial from 'components/atoms/author-social'
import Container from 'components/layout/container'
import PageLayout from 'components/layout/pageLayout'
import { getAllAuthors, getPostsPreview, getSingleAuthor } from 'lib/api'
import { getSectionSlug } from 'lib/utils/section'
import Image from 'next/image'
import { Author, AuthorPreview, PostPreview } from 'ts/models'

const WriterPage = ({
  author,
  posts,
  authors
}: {
  author: Author
  posts: PostPreview[]
  authors: AuthorPreview[]
}) => {
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

  return (
    <PageLayout
      posts={searcher}
      headProps={{ title: `Innk ba | ${author?.name}` }}
    >
      <Container size="small" className="flex flex-col items-center">
        <div
          className="w-full h-64 rounded-2xl"
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
        <div className="rounded-full p-1 w-32 h-32 -mt-16 bg-white">
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
        <p className="text-22 font-medium mt-2">{author?.name}</p>
        <p className="text-16 text-center mt-2 text-gray-700 max-w-md">
          {author.shortDescription}
        </p>
        <AuthorSocial author={author} className="mx-auto mt-6" />
      </Container>
    </PageLayout>
  )
}

export const getStaticPaths = async () => {
  const authors = await getAllAuthors()
  const paths = authors.map((each: any) => ({
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
