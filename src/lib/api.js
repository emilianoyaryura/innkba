import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

function getCleanPost(post) {
  if (!post) return
  return {
    title: post.fields.title,
    slug: post.fields.slug,
    copy: post.fields.copy,
    category: post.fields.section,
    tag: post.fields.tag,
    date: post.fields.date,
    author: post.fields.author?.map((author) => {
      return {
        name: author.fields.name,
        image: author.fields.frontImage
          ? `https:${author.fields.frontImage?.fields.file.url}`
          : '/images/brand/logo.svg',
        shortDescription: author.fields.shortDescription ?? '',
        instagram: author.fields.instagram ?? '',
        linkedin: author.fields.linkedin ?? '',
        facebook: author.fields.facebook ?? '',
        twitter: author.fields.twitter ?? '',
        website: author.fields.website ?? ''
      }
    }),
    spotify: {
      link: post.fields.spotifyLink ?? '',
      iframe: post.fields.spotifyIframe ?? ''
    },
    bigImages: post.fields.bigImages ?? false,
    content: post.fields.content,
    image: {
      src: `https:${post.fields.frontImage?.fields.file.url}` ?? null,
      title: post.fields.frontImage?.fields.title ?? ''
    }
  }
}

function getSectionHeader(header) {
  if (!header) return
  return {
    title: header.fields.title,
    copy: header.fields.copy,
    illustration: {
      src: header.fields.headerIllustration
        ? `https:${header.fields.headerIllustration?.fields.file.url}`
        : '',
      label: header.fields.title ?? '',
      width:
        header.fields.headerIllustration?.fields.file.details.image.width ??
        700,
      height:
        header.fields.headerIllustration?.fields.file.details.image.height ??
        525
    }
  }
}

export async function getHomePage() {
  const data = await client.getEntries({
    include: 4,
    content_type: 'pageHome'
  })
  const page = data.items[0]

  const quote = page.fields.weeklyQuote.fields
  const story = page.fields.story.fields

  return {
    mainFeaturedPost: getCleanPost(page.fields.mainFeaturedPost),
    featuredPosts: page.fields.featuredPosts.map((post) => getCleanPost(post)),
    weeklyQuote: {
      quote: quote.quote,
      author: {
        name: quote.author,
        image: `https:${quote.authorsImage?.fields.file.url}`,
        dates: {
          birth: quote.authorsBirthYear,
          death: quote.authorsDeathYear
        }
      }
    },
    story: {
      title: story.title,
      slug: story.slug,
      copy: story.copy,
      image: {
        src: story.image ? `https:${story.image?.fields.file.url}` : null,
        title: story.image.fields.title
      },
      author: {
        name: story.author.fields.name,
        image: story.author.fields.frontImage
          ? `https:${story.author.fields.frontImage?.fields.file.url}`
          : '/images/brand/logo.svg',
        shortDescription: story.author.fields.shortDescription ?? '',
        instagram: story.author.fields.instagram ?? '',
        linkedin: story.author.fields.linkedin ?? '',
        facebook: story.author.fields.facebook ?? '',
        twitter: story.author.fields.twitter ?? '',
        website: story.author.fields.website ?? ''
      },
      chapters: story.chapters.map((chapter) => {
        return {
          title: chapter.fields.title,
          slug: chapter.fields.slug,
          date: chapter.fields.date,
          content: chapter.fields.content,
          image: chapter.fields.image
            ? {
                src: chapter.fields.image
                  ? `https:${chapter.fields.image?.fields.file.url}`
                  : null,
                title: chapter.fields.title
              }
            : null
        }
      })
    }
  }
}

export async function getLifestylePage() {
  const data = await client.getEntries({
    include: 4,
    content_type: 'pageLifestyle'
  })
  const page = data.items[0]

  return {
    header: getSectionHeader(page.fields.header),
    featuredPosts: page.fields.featuredPosts.map((post) => getCleanPost(post))
  }
}

export async function getLiteraturePage() {
  const data = await client.getEntries({
    include: 4,
    content_type: 'pageLiterature'
  })
  const page = data.items[0]
  const quote = page.fields.quoteOfTheWeek.fields

  return {
    header: getSectionHeader(page.fields.header),
    featuredPosts: page.fields.featuredPosts.map((post) => getCleanPost(post)),
    weeklyQuote: {
      quote: quote.quote,
      author: {
        name: quote.author,
        image: `https:${quote.authorsImage?.fields.file.url}`,
        dates: {
          birth: quote.authorsBirthYear,
          death: quote.authorsDeathYear
        }
      }
    }
  }
}

export async function getCulturePage() {
  const data = await client.getEntries({
    include: 4,
    content_type: 'pageCulture'
  })
  const page = data.items[0]

  return {
    header: getSectionHeader(page.fields.header),
    featuredPosts: page.fields.featuredPosts.map((post) => getCleanPost(post))
  }
}

export async function getArtPage() {
  const data = await client.getEntries({
    include: 4,
    content_type: 'pageArt'
  })
  const page = data.items[0]

  return {
    header: getSectionHeader(page.fields.header),
    featuredPosts: page.fields.featuredPosts.map((post) => getCleanPost(post))
  }
}

export async function getTravelPage() {
  const data = await client.getEntries({
    include: 4,
    content_type: 'pageTravel'
  })
  const page = data.items[0]

  return {
    featuredPosts: page.fields.featuredPosts.map((post) => getCleanPost(post))
  }
}

export async function getPosts() {
  const posts = await client.getEntries({ content_type: 'post' })

  return posts.items.map((post) => getCleanPost(post))
}

export const getLifestylePosts = async () => {
  const allPosts = await getPosts()
  const posts = allPosts.filter((e) => e.category === 'Lifestyle')
  return posts
}

export const getTravelPosts = async () => {
  const allPosts = await getPosts()
  const posts = allPosts.filter(
    (e) => (e.category === 'Viajes') | (e.category === 'Diario de Viaje')
  )
  return posts
}

export const getArtandLiteraturePosts = async () => {
  const allPosts = await getPosts()
  const posts = allPosts.filter((e) => e.category === 'Arte y Literatura')
  return posts
}

export const getCulturePosts = async () => {
  const allPosts = await getPosts()
  const posts = allPosts.filter((e) => e.category === 'Cultura')
  return posts
}

export const getAllStories = async () => {
  const stories = await client.getEntries({ content_type: 'story' })
  return stories.items.map((s) => {
    return {
      title: s.fields.title,
      slug: s.fields.slug,
      copy: s.fields.copy ?? '',
      image: {
        src: s.fields.image ? `https:${s.fields.image?.fields.file.url}` : null,
        title: s.fields.title
      },
      author: {
        name: s.fields.author.fields.name,
        image: s.fields.author.fields.frontImage
          ? `https:${s.fields.author.fields.frontImage?.fields.file.url}`
          : '/images/brand/logo.svg',
        shortDescription: s.fields.author.fields.shortDescription ?? '',
        instagram: s.fields.author.fields.instagram ?? '',
        linkedin: s.fields.author.fields.linkedin ?? '',
        facebook: s.fields.author.fields.facebook ?? '',
        twitter: s.fields.author.fields.twitter ?? '',
        website: s.fields.author.fields.website ?? ''
      },
      chapters: s.fields.chapters.map((chapter) => {
        return {
          title: chapter.fields.title,
          slug: chapter.fields.slug,
          date: chapter.fields.date,
          content: chapter.fields.content,
          image: {
            src: chapter.fields.image
              ? `https:${chapter.fields.image?.fields.file.url}`
              : null,
            title: chapter.fields.title
          }
        }
      })
    }
  })
}
