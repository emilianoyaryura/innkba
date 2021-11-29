import { useRouter } from 'next/dist/client/router'
import { ContentfulPost, Story } from 'ts/models'
import Container from 'components/layout/container'
import PageLayout from 'components/layout/pageLayout'
import { getDate } from 'lib/utils/date'
import Image from 'next/image'
import Link from 'next/link'
import { renderBody } from 'lib/renderer'
import Post from 'components/atoms/post'
import Author from 'components/atoms/author'
import FacebookIcon from 'components/atoms/icons/facebook'
import TwitterIcon from 'components/atoms/icons/twitter'
import WhatsAppIcon from 'components/atoms/icons/whatsapp'
import clsx from 'clsx'
import InlineSpotify from 'components/molecules/spotify/inline'
import { getSectionSlug } from 'lib/utils/section'

const Template = ({
  posts,
  stories
}: {
  posts: ContentfulPost[]
  stories: Story[]
}) => {
  const router = useRouter()
  const query = router.query.slug
  const post = posts?.filter((p) => p.slug === query)[0]
  const story = stories?.filter((s) => s.slug === query)[0]

  if (post) {
    return (
      <PageLayout
        posts={posts}
        headProps={{
          title: post?.title,
          ogImage: post?.image.src ?? 'https://innkba.com/og.png'
        }}
      >
        <Container
          size="large"
          className=" mt-10 sm:mt-12 flex flex-col items-center"
        >
          <div className="flex items-center justify-center space-x-6 mb-6">
            <Link href={`/${getSectionSlug(post.category)}`} passHref>
              <a className="flex items-center justify-center py-2 px-4 rounded bg-lightBlue">
                <span className="uppercase text-11 text-blue font-bold">
                  {post.category}
                </span>
              </a>
            </Link>
            <Link
              href={`/${getSectionSlug(
                post.category
              )}#${post.tag.toLocaleLowerCase()}`}
              passHref
            >
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
                <p className="text-14 text-gray-700">{getDate(post.date)}</p>
              </div>
              <div className="absolute right-0 hidden sm:flex items-center">
                <span className="text-14 text-gray-700 mr-6">Compartir en</span>
                <div className="flex items-center space-x-4">
                  <Link
                    href={`https://twitter.com/intent/tweet?text=${
                      post.title
                    }&url=https://innkba.com/${post.category.toLocaleLowerCase()}/${
                      post.slug
                    }`}
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
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://innkba.com/${post.category.toLocaleLowerCase()}/${
                      post.slug
                    }`}
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
                    href={`https://api.whatsapp.com/send?text=Mirá este artículo ${
                      post.author[0].name
                    } en Innk ba: https://innkba.com/${post.category.toLocaleLowerCase()}/${
                      post.slug
                    }`}
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
              <p className="text-16 text-gray-700 mb-3">Compartir en</p>
              <div className="flex items-center space-x-6 -mb-2">
                <Link
                  href={`https://twitter.com/intent/tweet?text=${
                    post.title
                  }&url=https://innkba.com/${post.category.toLocaleLowerCase()}/${
                    post.slug
                  }`}
                  passHref
                >
                  <a target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/icons/twitter.svg"
                      width={22}
                      height={18}
                      alt="share twitter mobile"
                    />
                  </a>
                </Link>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://innkba.com/${post.category.toLocaleLowerCase()}/${
                    post.slug
                  }`}
                  passHref
                >
                  <a target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/icons/facebook.svg"
                      alt="share facebook mobile"
                      width={14}
                      height={20}
                    />
                  </a>
                </Link>
                <Link
                  href={`https://api.whatsapp.com/send?text=Mirá este artículo ${
                    post.author[0].name
                  } en Innk ba: https://innkba.com/${post.category.toLocaleLowerCase()}/${
                    post.slug
                  }`}
                  passHref
                >
                  <a target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/icons/whatsapp.svg"
                      alt="share whatsapp mobile"
                      width={22}
                      height={22}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          {post.spotify?.link && <InlineSpotify link={post.spotify?.link} />}
          <div
            className={clsx('mt-8 sm:mt-12 md:mt-16', {
              'max-w-2xl': !post.bigImages
            })}
          >
            {renderBody(post.content, post.bigImages)}
            <Author author={post.author} />
          </div>
          <div className="mt-32">
            <p className="text-26 text-center sm:text-left sm:text-32 font-semibold mb-8 sm:mb-5">
              Seguir leyendo
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-x-4 lg:gap-x-8">
              {posts
                ?.filter((e) => e.category === post.category)
                .filter((p) => p.slug !== query)
                .slice(0, 6)
                .map((each, idx) => (
                  <Post key={idx} post={each} withoutCategory />
                ))}
            </div>
          </div>
        </Container>
      </PageLayout>
    )
  } else if (story) {
    return (
      <PageLayout
        posts={posts}
        headProps={{
          title: story?.title,
          ogImage: story?.image.src ?? 'https://innkba.com/og.png'
        }}
      >
        <Container size="large">aca</Container>
      </PageLayout>
    )
  } else return null
}

export default Template
