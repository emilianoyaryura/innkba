export type Author = {
  name: string
  image: string
  shortDescription: string
  twitter?: string
  instagram?: string
  facebook?: string
  linkedin?: string
  website?: string
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
  author: Author[]
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

export type Page = {
  header: {
    title: string
    copy: string
    ctas: {
      href: string
      label: string
    }[]
    illustration: {
      src: string
      label?: string
      width?: string | number
      height?: string | number
    }
  }
  featuredPosts: Post[] | null
}
