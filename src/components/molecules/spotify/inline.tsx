import clsx from 'clsx'
import SpotifyIcon from 'components/atoms/icons/spotify'
import Link from 'next/link'
import s from './spotify.module.css'

const InlineSpotify = ({ link }: { link: string }) => {
  return (
    <Link href={link} passHref>
      <a
        href={link}
        target="_blank"
        aria-label="Escuchar en spotify"
        className={clsx(
          'text-black hover:text-white noDecoration rounded mt-12',
          s.inline__container
        )}
        rel="noreferrer"
      >
        <span className="px-4 py-2 bg-white hover:bg-transparent flex items-center rounded">
          <SpotifyIcon />
          <span className="transition-all duration-150 ml-2 font-medium text-18">
            Escuchar en Spotify
          </span>
        </span>
      </a>
    </Link>
  )
}

export default InlineSpotify
