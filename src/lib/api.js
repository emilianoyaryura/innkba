import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

function getCleanPosts(posts) {
  return posts.map((post) => {
    return {
      title: post.fields.title,
      slug: post.fields.slug,
      copy: post.fields.copy,
      category: post.fields.section,
      tag: post.fields.tag,
      date: post.fields.date,
      author: post.fields.author.map((author) => {
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
      content: post.fields.content,
      image: {
        src: `https:${post.fields.frontImage?.fields.file.url}` ?? null,
        title: post.fields.frontImage?.fields.title ?? ''
      }
    }
  })
}

export async function getLifestylePage() {
  const page = await client.getEntry({ content_type: 'pageLifestyle' })

  return {
    header: {
      title: page.fields.header.fields.title ?? '',
      copy: page.fields.header.fields.copy ?? '',
      illustration: page.fields.header.fields.headerIllustration
        ? `https:${page.fields.header.fields.headerIllustration?.fields.file.url}`
        : '',
      ctas: page.fields.header.fields.ctas?.map((cta) => {
        return {
          href: cta.fields.href,
          label: cta.fields.label
        }
      })
    },
    featuredPosts: getCleanPosts(page.fields.featuredPosts)
  }
}

export async function getLiteraturePage() {
  const page = await client.getEntry({ content_type: 'pageLiterature' })

  return {
    header: {
      title: page.fields.header.fields.title ?? '',
      copy: page.fields.header.fields.copy ?? '',
      illustration: page.fields.header.fields.headerIllustration
        ? `https:${page.fields.header.fields.headerIllustration?.fields.file.url}`
        : '',
      ctas: page.fields.header.fields.ctas?.map((cta) => {
        return {
          href: cta.fields.href,
          label: cta.fields.label
        }
      })
    },
    featuredPosts: getCleanPosts(page.fields.featuredPosts)
  }
}

export async function getCulturePage() {
  const page = await client.getEntry({ content_type: 'pageCulture' })

  return {
    header: {
      title: page.fields.header.fields.title ?? '',
      copy: page.fields.header.fields.copy ?? '',
      illustration: page.fields.header.fields.headerIllustration
        ? `https:${page.fields.header.fields.headerIllustration?.fields.file.url}`
        : '',
      ctas: page.fields.header.fields.ctas?.map((cta) => {
        return {
          href: cta.fields.href,
          label: cta.fields.label
        }
      })
    },
    featuredPosts: getCleanPosts(page.fields.featuredPosts)
  }
}

export async function getArtPage() {
  const page = await client.getEntry({ content_type: 'pageArt' })

  return {
    header: {
      title: page.fields.header.fields.title ?? '',
      copy: page.fields.header.fields.copy ?? '',
      illustration: page.fields.header.fields.headerIllustration
        ? `https:${page.fields.header.fields.headerIllustration?.fields.file.url}`
        : '',
      ctas: page.fields.header.fields.ctas?.map((cta) => {
        return {
          href: cta.fields.href,
          label: cta.fields.label
        }
      })
    },
    featuredPosts: getCleanPosts(page.fields.featuredPosts)
  }
}

export async function getTravelPage() {
  const page = await client.getEntry({ content_type: 'pageTravel' })

  return {
    featuredPosts: getCleanPosts(page.fields.featuredPosts)
  }
}

export async function getPosts() {
  const posts = await client.getEntries({ content_type: 'post' })

  return getCleanPosts(posts.items)
}

export const getLifestylePosts = async () => {
  const allPosts = await getPosts()
  const posts = allPosts.filter((e) => e.category === 'Lifestyle')
  return posts
}

export const getLiteraturePosts = async () => {
  const allPosts = await getPosts()
  const posts = allPosts.filter((e) => e.category === 'Literatura')
  return posts
}

export const getTravelPosts = async () => {
  const allPosts = await getPosts()
  const posts = allPosts.filter(
    (e) => (e.category === 'Viajes') | (e.category === 'Diario de Viaje')
  )
  return posts
}

export const getArtPosts = async () => {
  const allPosts = await getPosts()
  const posts = allPosts.filter(
    (e) => (e.category === 'Viajes') | (e.category === 'Arte')
  )
  return posts
}

export const getCulturePosts = async () => {
  const allPosts = await getPosts()
  const posts = allPosts.filter(
    (e) => (e.category === 'Viajes') | (e.category === 'Cultura')
  )
  return posts
}
