import PageLayout from 'components/layout/pageLayout'
import { getAllAuthors, getPostsPreview } from 'lib/api'
import { getSectionSlug } from 'lib/utils/section'
import Link from 'next/link'
import { AuthorPreview, ContentfulPost } from 'ts/models'

const TerminosYCondiciones = ({
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
    <PageLayout
      posts={searcher}
      headProps={{ title: 'Innk ba | Términos y Condiciones' }}
    >
      <div className="flex flex-col mt-12 sm:mt-20 max-w-3xl mx-auto px-4 relative">
        <p className="text-22 sm:text-26 font-bold uppercase">
          Términos y Condiciones
        </p>
        <div className="h-px w-full bg-gray-300 mt-2 mb-6" />
        <div className="flex flex-col space-y-3">
          <p>
            Cada escritor es responsable por su uso de los servicios brindados
            por INNKBA y de cualquier contenido que publique en la página,
            incluyendo el cumplimiento con las leyes, reglas y normas
            aplicables.
          </p>
          <p>
            Cada escritor afirma, con carácter de declaración jurada, ser
            autor/a del contenido enviado a INNKBA para su publicación y que su
            autoría no se encuentra registrada en el registro de propiedad
            intelectual por otra persona. Asimismo, afirma, con carácter de
            declaración jurada, que las imágenes proporcionadas a INNKBA son de
            su propia autoría, que adquirió los derechos de autor sobre las
            mismas, o que fueron extraídas de un banco de imágenes gratuito para
            uso público.
          </p>
          <p>
            Todo el contenido o material que publica INNKBA es responsabilidad
            única de la persona que lo produce. En ningún caso INNKBA ratifica,
            afirma ni garantiza la veracidad del contenido que publican sus
            usuarios.
          </p>
          <p>
            No existe ningún tipo de relación laboral entre INNKBA y aquellos
            que escriban en la página, como tampoco ninguna obligación de pago
            entre ninguna de las partes.
          </p>
          <p className="mt-8">
            Para más información sobre nosotros,{' '}
            <Link href="/nosotros">
              <a
                aria-label="nosotros"
                target="_blank"
                rel="noopener"
                className="font-medium cursor-pointer"
              >
                seguí este link
              </a>
            </Link>
          </p>
        </div>
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

export default TerminosYCondiciones
