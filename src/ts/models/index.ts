import { Category } from 'components/layout/nav'

export type Author = {
  name: string
  link?: string
  image?: string
  data?: string
}

export type PostWithoutImagePreview = {
  link: {
    href: string
    label?: string
  }
  title: string
  copy: string
}

export type ContentfulPost = {
  title: string
  slug: string
  copy: string
  category: 'Lifestyle' | 'Arte' | 'Literatura' | 'Viajes' | 'Cultura'
  date: string
  author: {
    name: string
    instagram?: string
    twitter?: string
  }
  content: any
  image: {
    src: string | null
    title: string
  }
}

export type Post = {
  link: {
    href: string
    label?: string
  }
  image: {
    src: string
    title?: string
  }
  category: Category
  title: string
  copy?: string
  author?: Author
  content: string
}
