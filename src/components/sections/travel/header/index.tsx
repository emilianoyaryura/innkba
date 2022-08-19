import s from './header.module.css'
import Container from 'components/layout/container'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

const TravelHeader = () => {
  return (
    <Container
      size="large"
      className={clsx(
        'flex flex-col items-center pt-20 sm:pt-28 lg:pt-24',
        s.container
      )}
    >
      <h1 className="font-bold text-32 sm:text-48 max-w-2xl text-center tracking-tight leading-smooth">
        Conocé el mundo de una manera diferente
      </h1>
      <div className="flex flex-col items-center mt-6 -mb-8 sm:mb-20 md:mb-12 lg:-mb-12 z-50">
        <p className="text-14 sm:text-16 font-medium text-center text-black mb-3">
          Te gustaría compartir tus viajes en Innk ba?
        </p>
        <p className="text-14 sm:text-16 font-medium text-center text-gray-700 mb-20 sm:mb-0">
          Escribinos a{' '}
          <Link href="mailto:innkba@gmail.com" passHref>
            <a
              aria-label="contacto para escribir en Viajes"
              href="mailto:innkba@gmail.com"
            >
              innkba@gmail.com
            </a>
          </Link>{' '}
          y contanos tus ideas!
        </p>
      </div>
      <div className="hidden sm:flex">
        <Image
          src="/images/travel-header.svg"
          alt="Travel header"
          objectFit="cover"
          height={414}
          width={1100}
        />
      </div>
      <div className="flex sm:hidden">
        <Image
          src="/images/travel-header-mobile.svg"
          alt="Travel header"
          objectFit="cover"
          height={390}
          width={474}
        />
      </div>
    </Container>
  )
}

export default TravelHeader
