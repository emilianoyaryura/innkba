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

  return {
    header: getSectionHeader(page.fields.header),
    featuredPosts: page.fields.featuredPosts.map((post) => getCleanPost(post))
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
  const page = await client.getEntry({ include: 4, content_type: 'pageTravel' })

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
