import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

export async function getPosts() {
  const posts = await client.getEntries({ content_type: 'post' })

  return posts.items.map((post) => {
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
          instagram: author.fields.instagram,
          twitter: author.fields.twitter
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
