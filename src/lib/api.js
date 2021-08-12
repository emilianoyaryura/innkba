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
      date: post.fields.date,
      author: post.fields.author.map((author) => {
        return {
          name: author.fields.name,
          instagram: author.fields.instagram,
          twitter: author.fields.twitter
        }
      }),
      content: post.fields.content.content,
      image: {
        src: `https:${post.fields.frontImage?.fields.file.url}` ?? null,
        title: post.fields.frontImage?.fields.title ?? ''
      }
    }
  })
}
