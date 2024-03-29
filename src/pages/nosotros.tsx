import PageLayout from 'components/layout/pageLayout'
import { getAllAuthors, getPostsPreview } from 'lib/api'
import { getSectionSlug } from 'lib/utils/section'
import Image from 'next/image'
import Link from 'next/link'
import { AuthorPreview, ContentfulPost } from 'ts/models'

const Nosotros = ({
  contentfulPosts,
  authors
}: {
  contentfulPosts: ContentfulPost[]
  authors: AuthorPreview[]
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
    <PageLayout posts={searcher} headProps={{ title: 'Innk ba | Nosotros' }}>
      <div className="flex flex-col mt-12 sm:mt-20 max-w-3xl mx-auto px-4 relative">
        <p className="text-22 sm:text-26 font-bold uppercase">Nosotros</p>
        <div className="h-px w-full bg-gray-300 mt-2 mb-6" />
        <div className="flex flex-col space-y-3 mb-14">
          <p>
            Innk ba es una revista digital en la que cualquier persona puede
            expresarse. ¿Los motivos? No existen. O sí, pueden ser todos. Los
            que decidan formar parte de Innk no necesitan encontrar ese “algo”
            que los justifique. Algunos escriben porque les gusta, otros para
            darse a conocer y otros como un negocio, por ejemplo.
          </p>
          <p>
            En fin, más allá de los tantos motivos, desde Innk únicamente nos
            interesa brindar un nuevo espacio para que se escuchen distintas
            voces, distintas historias y surjan nuevos talentos. Al haber
            escritores de variadas culturas, creencias, gustos y países, estamos
            seguros de que tu participación en la revista no va a ser en vano.
            Todo lo que tengas para contar seguro le servirá alguien y todo lo
            que cuenten los demás, seguro te servirá a vos.
          </p>
          <p>
            Dicho esto, te invitamos a que{' '}
            <Link href="/">
              <a
                aria-label="web"
                className="noDecoration font-semibold underline text-blue"
              >
                navegues la web
              </a>
            </Link>{' '}
            y{' '}
            <Link href="mailto:contacto@innkba.com" passHref>
              <a
                aria-label="contact"
                href="mailto:contacto@innkba.com"
                target="_blank"
                rel="noopener"
                className="noDecoration font-semibold underline text-blue"
              >
                escribas con nosotros.
              </a>
            </Link>
          </p>
        </div>
        <Image
          src="/images/nosotros.svg"
          alt="nosotros"
          width={400}
          height={400}
        />
      </div>
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const posts = await getPostsPreview()
  const authors = await getAllAuthors()

  return {
    props: {
      contentfulPosts: posts ?? null,
      authors: authors ?? null
    }
  }
}

export default Nosotros
