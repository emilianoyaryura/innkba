import PageLayout from 'components/layout/pageLayout'
import { getPostsPreview } from 'lib/api'
import { getSectionSlug } from 'lib/utils/section'
import Image from 'next/image'
import { ContentfulPost } from 'ts/models'

const Nosotros = ({
  contentfulPosts
}: {
  contentfulPosts: ContentfulPost[]
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
  return (
    <PageLayout posts={tinyPosts} headProps={{ title: 'Innk ba | Nosotros' }}>
      <div className="flex flex-col mt-12 sm:mt-20 max-w-3xl mx-auto px-4 relative">
        <p className="text-22 sm:text-26 font-bold uppercase">Nosotros</p>
        <div className="h-px w-full bg-gray-300 mt-2 mb-6" />
        <div className="flex flex-col space-y-3 mb-14">
          <p>
            Innk ba es una revista digital en la cualquier persona puede
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
            Dicho esto, <b>te invitamos a que escribas con nosotros.</b>
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

  return {
    props: {
      contentfulPosts: posts ?? null
    }
  }
}

export default Nosotros
