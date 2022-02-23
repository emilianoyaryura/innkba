import { useRouter } from 'next/dist/client/router'
import { ContentfulPost, Story } from 'ts/models'
import Container from 'components/layout/container'
import PageLayout from 'components/layout/pageLayout'
import { getDate } from 'lib/utils/date'
import Image from 'next/image'
import Link from 'next/link'
import { renderBody } from 'lib/renderer'
import Post from 'components/atoms/post'
import FacebookIcon from 'components/atoms/icons/facebook'
import TwitterIcon from 'components/atoms/icons/twitter'
import WhatsAppIcon from 'components/atoms/icons/whatsapp'
import clsx from 'clsx'
import InlineSpotify from 'components/molecules/spotify/inline'
import { getSectionSlug } from 'lib/utils/section'
import Share from 'components/atoms/share'
import PostAuthor from 'components/atoms/author'

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

  const keepReadingPosts = posts
    ?.filter((e) => e.category === post?.category)
    .filter((p) => p.slug !== query)

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
              <Share
                title={post.title}
                authorName={post.author[0].name}
                category={post.category}
                slug={post.slug}
                className="absolute right-0 hidden sm:flex"
              />
            </div>
            <Image
              src={post.image.src ?? ''}
              alt={post.image.title ?? post.title}
              width={860}
              height={490}
              objectFit="cover"
              className="rounded-xl sm:rounded-2xl"
            />
            <Share
              title={post.title}
              authorName={post.author[0].name}
              category={post.category}
              slug={post.slug}
              className="flex sm:hidden"
            />
          </div>
          {post.spotify?.link && <InlineSpotify link={post.spotify?.link} />}
          <div
            className={clsx('mt-8 sm:mt-12 md:mt-16', {
              'max-w-2xl': !post.bigImages
            })}
          >
            {renderBody(post.content, post.bigImages)}
            <PostAuthor author={post.author} />
          </div>
          <div className="mt-32">
            <p className="text-26 text-center sm:text-left sm:text-32 font-semibold mb-8 sm:mb-5">
              Seguir leyendo
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-x-4 lg:gap-x-8">
              {keepReadingPosts.length > 0
                ? keepReadingPosts
                    .slice(0, 6)
                    .map((each, idx) => (
                      <Post key={idx} post={each} withoutCategory />
                    ))
                : posts
                    .filter((p) => p.slug !== post.slug)
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
        <Container size="large" className="mt-14">
          <div className="flex flex-col lg:grid w-full lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-center lg:items-start self-center max-w-2xl lg:max-w-max">
              <h1 className="font-medium text-28 sm:text-38 mb-4 text-center lg:text-left">
                {story.title}
              </h1>
              <p className="font-normal text-14 sm:text-16 leading-relaxed text-gray-700 text-center lg:text-left">
                {story.copy}
              </p>
              <p className="text-16 text-gray-700 mt-4 sm:mt-8">
                Por <b className="text-black">{story.author.name}</b>
              </p>
              <div className="flex items-center mt-8 sm:mt-14 pt-4 border-t border-solid border-gray-400 w-full justify-center lg:justify-start max-w-md">
                <span className="text-14 text-gray-700 mr-6">Compartir en</span>
                <div className="flex items-center space-x-4">
                  <Link
                    href={`https://twitter.com/intent/tweet?text=${story.title}&url=https://innkba.com/arte-y-literatura/${story.slug}`}
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
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://innkba.com/arte-y-literatura/${story.slug}`}
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
                    href={`https://api.whatsapp.com/send?text=Mirá este artículo ${story.author.name} en Innk ba: https://innkba.com/arte-y-literatura/${story.slug}`}
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
            <img
              src={story.image.src ?? ''}
              alt={story.title}
              className="w-full h-auto max-w-md lg:max-w-xl object-cover"
            />
          </div>
          <div className="flex flex-col mx-auto mt-20 sm:mt-32 md:mt-44 max-w-2xl">
            {story.chapters.map((c, idx) => (
              <Link
                key={idx}
                href={`/arte-y-literatura/${story.slug}/${c.slug}`}
              >
                <a className="noDecoration transition-all transform hover:translate-x-4 duration-150 py-5 border-b border-solid border-gray-400">
                  <p className="text-18 lg:text-22 inline-flex">
                    <span className="border-solid border-black border h-8 w-8 flex items-center justify-center rounded-full">
                      {idx + 1}
                    </span>
                    <span className="ml-6 font-medium">{c.title}</span>
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </Container>
      </PageLayout>
    )
  } else return null
}

export default Template
