import PageLayout from 'components/layout/pageLayout'
import { getAllAuthors, getPostsPreview, getTermsAndConditions } from 'lib/api'
import { renderBody } from 'lib/renderer'
import { getSectionSlug } from 'lib/utils/section'
import { AuthorPreview, ContentfulPost } from 'ts/models'

const TerminosYCondiciones = ({
  contentfulPosts,
  authors,
  terms
}: {
  contentfulPosts: ContentfulPost[]
  authors: AuthorPreview[]
  terms: any
}) => {
  const tinyPosts = contentfulPosts.map((p) => {
    const section = getSectionSlug(p.category)
    return {
      title: p.title,
      href: `/${section}/${p.slug}`,
      category: p.category,
      tag: p.tag
    }
  })

  const authorsSearcher = authors?.map((au) => {
    return {
      title: au.name,
      href: `/escritores/${au.slug}`,
      category: 'Escritores',
      tag: ''
    }
  })

  // @ts-ignore
  const searcher = tinyPosts?.concat(authorsSearcher)
  return (
    <PageLayout
      posts={searcher}
      headProps={{ title: 'Innk ba | Términos y Condiciones' }}
    >
      <div className="flex flex-col mt-12 sm:mt-20 max-w-2xl mx-auto px-4 relative">
        <p className="text-22 font-bold uppercase">Términos y Condiciones</p>
        <div className="h-px w-full bg-gray-300 mt-2 mb-6" />
        <div>{renderBody(terms)}</div>
      </div>
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const posts = await getPostsPreview()
  const authors = await getAllAuthors()
  const terms = await getTermsAndConditions()

  return {
    props: {
      contentfulPosts: posts ?? null,
      authors: authors ?? null,
      terms: terms ?? null
    }
  }
}

export default TerminosYCondiciones
