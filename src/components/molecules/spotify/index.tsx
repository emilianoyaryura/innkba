import clsx from 'clsx'
import Container from 'components/layout/container'
import SectionLayout from 'components/layout/sectionLayout'
import Link from 'next/link'
import Image from 'next/image'
import s from './spotify.module.css'

type SpotifyProps = {
  title: string
  copy: string
  link: {
    label?: string
    href: string
  }
  secondLink?: {
    label?: string
    href: string
  }
  iframe: string
}

const Spotify = ({ title, copy, link, secondLink, iframe }: SpotifyProps) => {
  return (
    <SectionLayout>
      <Container
        size="medium"
        className={clsx(
          'flex py-9 sm:py-16 px-5 sm:px-24 justify-between items-center',
          s.container
        )}
      >
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="text-white text-26 sm:text-32 font-bold leading-normal text-center lg:text-left">
            {title}
          </h1>
          <p className="text-white mt-6 mb-14 text-14 sm:text-16 opacity-90 text-center lg:text-left">
            {copy}
          </p>
          <div className="flex items-center">
            <Link href={link.href}>
              <a className={clsx('flex items-center noDecoration', s.button)}>
                <Image
                  src="/icons/spotify.svg"
                  width={24}
                  height={24}
                  alt="Spotify"
                />
                <span className="ml-3">{link.label ?? 'Escuchar Ahora'}</span>
              </a>
            </Link>
            {secondLink?.href && (
              <Link href={secondLink.href}>
                <a className={clsx('noDecoration', s.secondButton)}>
                  {secondLink.label ?? 'Leer Más'}
                </a>
              </Link>
            )}
          </div>
        </div>
        <iframe
          src={iframe}
          width="300"
          height="310"
          frameBorder="0"
          allow="encrypted-media"
          className="hidden lg:flex rounded-xl ml-14"
        />
      </Container>
    </SectionLayout>
  )
}

export default Spotify
