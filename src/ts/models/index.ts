import { Category } from 'components/layout/nav'

export type Author = {
  name: string
  link?: string
  image?: string
  data?: string
}

export type Post = {
  link: string
  image: {
    src: string
    title?: string
  }
  category: Category
  title: string
  author?: Author
  frontImage: {
    src: string
    title?: string
  }
  content: string
}
