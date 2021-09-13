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

export type Category =
  | 'Lifestyle'
  | 'Arte'
  | 'Literatura'
  | 'Viajes'
  | 'Cultura'
  | 'Diario de Viaje'

export type Tag =
  | 'Hobbies'
  | 'Geografía'
  | 'Historia'
  | 'Música'
  | 'Películas'
  | 'Libros'
  | 'Descubre'
  | 'Lugares'
  | 'Salud'
  | 'Comdias'
  | 'Trending'
  | 'Sintiendo la Música'
  | 'Fashion'

export type ContentfulPost = {
  title: string
  slug: string
  copy: string
  category: Category
  tag: Tag
  date: string
  author: {
    name: string
    instagram?: string
    twitter?: string
  }[]
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
