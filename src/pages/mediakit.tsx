import FadeIn from 'components/common/fadeIn'
import Container from 'components/layout/container'
import PageLayout from 'components/layout/pageLayout'
import Counters from 'components/sections/mediakit/counters'
import MediakitHero from 'components/sections/mediakit/hero'
import travel from '../../public/images/mediakit/travel.jpeg'
import art from '../../public/images/mediakit/art.jpeg'
import caba from '../../public/images/mediakit/caba.jpg'
import Image from 'next/image'

const Mediakit = () => {
  return (
    <PageLayout
      headProps={{
        title: 'Innk ba - Mediakit',
        description: 'Revista digital. Nuevo espacio. Nuevas ideas.',
        cannonical: 'https://www.innkba.com/',
        ogImage: 'https://www.innkba.com/mediakit-og.png'
      }}
      withoutPreFooter
    >
      <div
        style={{ maxWidth: '1440px' }}
        className="mx-auto flex flex-col relative"
      >
        <MediakitHero />
      </div>
      <FadeIn className="flex max-w-1440 mx-auto justify-center items-center">
        <Image src={caba} alt="caba" />
      </FadeIn>
      <Container size="large" className="mt-3">
        <div className="h-screen max-h-820 flex items-center justify-center">
          <FadeIn>
            <p className="text-16 sm:text-18 opacity-90 max-w-xl text-center">
              Innk ba es una revista digital de contenido original. Invita a los
              escritores a compartir su palabra, a los viajeros a compartir sus
              experiencias, a los pensadores a compartir sus ideas y a los
              artistas a compartir sus obras.{' '}
              <b>
                Que lo que escribas no quede tirado en un cajón. Compartí lo
                tuyo. Compartilo en Innk.
              </b>
            </p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-8 justify-items-center">
          <FadeIn className="max-w-lg">
            <Image src={art} alt="art" />
          </FadeIn>
          <FadeIn className="max-w-lg mt-32 sm:mt-52">
            <Image src={travel} alt="travel" />
          </FadeIn>
        </div>
        <Counters />
        <div className="flex items-center gap-20 flex-col-reverse md:flex-row">
          <FadeIn>
            <video controls src={'/reel.mp4'} autoPlay muted width={400} />
          </FadeIn>
          <div className="flex flex-1 flex-col items-center">
            <FadeIn delay={0.1}>
              <p className="text-22 font-semibold mb-3">
                Escribí lo que quieras
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-16 opacity-90 max-w-xl text-center">
                Buscando un slogan, no encontramos nada que nos represente mejor
                que <i>"Escribí lo que quieras"</i>. No somos solo una revista
                digital, somos una comunidad. Aquellos que se animen a escribir,
                no solo van a hallar un espacio para plasmar sus ideas
                libremente, sino un grupo de gente dispuesta a ayudarlos a
                difundirlas.
              </p>
            </FadeIn>
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}

export default Mediakit
