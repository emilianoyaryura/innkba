export type Quote = {
  quote: string
  author: {
    name: string
    image: string
    dates: {
      birth: number | string
      death?: number | string
    }
  }
  className?: string
}

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

export type Category = 'Lifestyle' | 'Arte y Literatura' | 'Viajes' | 'Cultura'

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
  spotify?: {
    link: string
    iframe: string
  }
  bigImages: boolean
  content: any
  image: {
    src: string | null
    title: string
  }
}

export type ShortStory = {
  title: string
  slug: string
  tag: Tag
  date: string
  content: any
  image?: {
    src: string | null
    title: string
  }
}

export type Story = {
  title: string
  slug: string
  copy: string
  image: {
    src: string | null
    title: string
  }
  author: Author
  chapters: ShortStory[]
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
  featuredPosts: ContentfulPost[]
  mainFeaturedPost?: ContentfulPost
  weeklyQuote?: Quote
  story: Story
}
