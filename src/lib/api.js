import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

export async function getPosts() {
  const posts = await client.getEntries({ content_type: 'post' })

  return posts.items
}
