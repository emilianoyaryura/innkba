import { getLiteraturePosts } from 'lib/api'
import { useRouter } from 'next/dist/client/router'
import { ContentfulPost } from 'ts/models'
import Container from 'components/layout/container'
import PageLayout from 'components/layout/pageLayout'
import { getDate } from 'lib/utils/date'
import Image from 'next/image'
import Link from 'next/link'
import { renderBody } from 'lib/renderer'

const LiteraturePost = ({ posts }: { posts: ContentfulPost[] }) => {
  const router = useRouter()
  const query = router.query.slug
  const post = posts.filter((p) => p.slug === query)[0]

  return (
    <PageLayout
      headProps={{
        title: post.title,
        ogImage: post.image.src ?? 'https://innkba.com/og.png'
      }}
    >
      <Container
        size="large"
        className=" mt-10 sm:mt-12 flex flex-col items-center"
      >
        <div className="flex items-center justify-center space-x-6 mb-6">
          <Link href="" passHref>
            <a className="flex items-center justify-center py-2 px-4 rounded bg-lightBlue">
              <span className="uppercase text-11 text-blue font-bold">
                {post.category}
              </span>
            </a>
          </Link>
          <Link href="" passHref>
            <a className="flex items-center justify-center py-2 px-4 rounded bg-lightBlue">
              <span className="uppercase text-11 text-blue font-bold">
                {post.tag}
              </span>
            </a>
          </Link>
        </div>
        <h1 className="text-center text-28 md:text-38 font-bold max-w-xl md:max-w-3xl leading-tight md:leading-normal mb-5">
          {post.title}
        </h1>
        <div>
          <div className="flex items-center justify-center sm:justify-start md:justify-center mb-6 relative">
            <div className="flex flex-col items-center sm:items-start md:items-center">
              <p className="text-16 font-medium">{post.author[0].name}</p>
              <p className="text-14 text-gray-600">{getDate(post.date)}</p>
            </div>
            <div className="absolute right-0 hidden sm:flex items-center">
              <span className="text-14 text-gray-600 mr-6">Compartir en</span>
              <div className="flex items-center space-x-4 -mb-2">
                <Link
                  href={`https://twitter.com/intent/tweet?text=${post.title}&url=https://innkba.com/literatura/${post.slug}`}
                  passHref
                >
                  <a target="_blank" rel="noopener noreferrer">
                    <Image src="/icons/twitter.svg" width={22} height={18} />
                  </a>
                </Link>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://innkba.com/literatura/${post.slug}`}
                  passHref
                >
                  <a target="_blank" rel="noopener noreferrer">
                    <Image src="/icons/facebook.svg" width={14} height={20} />
                  </a>
                </Link>
                <Link
                  href={`https://api.whatsapp.com/send?text=Mirá este artículo de Innk ba: https://innkba.com/literatura/${post.slug}`}
                  passHref
                >
                  <a target="_blank" rel="noopener noreferrer">
                    <Image src="/icons/whatsapp.svg" width={22} height={22} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <Image
            src={post.image.src ?? ''}
            alt={post.image.title ?? post.title}
            width={860}
            height={490}
            objectFit="cover"
            className="rounded-xl sm:rounded-2xl"
          />
          <div className="flex flex-col mt-3 sm:hidden items-center mx-auto">
            <p className="text-16 text-gray-600 mb-3">Compartir en</p>
            <div className="flex items-center space-x-6 -mb-2">
              <Link
                href={`https://twitter.com/intent/tweet?text=${post.title}&url=https://innkba.com/literatura/${post.slug}`}
                passHref
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="share on twitter"
                >
                  <Image
                    src="/icons/twitter.svg"
                    width={22}
                    height={18}
                    alt="share on twitter"
                  />
                </a>
              </Link>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=https://innkba.com/literatura/${post.slug}`}
                passHref
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="share on facebook"
                >
                  <Image
                    src="/icons/facebook.svg"
                    width={14}
                    height={20}
                    alt="share on facebook"
                  />
                </a>
              </Link>
              <Link
                href={`https://api.whatsapp.com/send?text=Mirá este artículo de Innk ba: https://innkba.com/literatura/${post.slug}`}
                passHref
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="share on whatsapp"
                >
                  <Image
                    src="/icons/whatsapp.svg"
                    width={22}
                    height={22}
                    alt="share on whatsapp"
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 md:mt-16 max-w-2xl">
          {renderBody(post.content)}
        </div>
      </Container>
    </PageLayout>
  )
}

export const getStaticPaths = async () => {
  const posts = await getLiteraturePosts()
  const paths = posts.map((each: any) => ({
    params: { slug: each.slug as string }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async () => {
  const posts = await getLiteraturePosts()

  return {
    props: {
      posts: posts ?? null
    }
  }
}

export default LiteraturePost
