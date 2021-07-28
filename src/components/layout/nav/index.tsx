import Image from 'next/image'
import Container from '../container'
import s from './nav.module.css'
import Link from 'next/link'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'

type Menu = {
  label: string
  route: string
}[]

type Props = {
  selected:
    | 'lifestyle'
    | 'viajes'
    | 'cultura'
    | 'arte'
    | 'literatura'
    | 'inicio'
}

const menu: Menu = [
  {
    label: 'Lifestyle',
    route: '/'
  },
  {
    label: 'Viajes',
    route: '/'
  },
  {
    label: 'Cultura',
    route: '/'
  },
  {
    label: 'Arte',
    route: '/'
  },
  {
    label: 'Literatura',
    route: '/'
  }
]

const Nav = ({ selected }: Props) => {
  const [scrollsDown, setScrollsDown] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    if (window.scrollY > 80) {
      setScrollsDown(true)
    } else {
      setScrollsDown(false)
    }
  }, [])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  return (
    <>
      <div
        className={clsx('bg-white transition-all duration-200', s.nav, {
          'shadow-sm': scrollsDown && !menuOpen
        })}
      >
        <Container
          size="large"
          className="hidden justify-between items-center lg:flex"
        >
          <Image
            src="/images/brand/logo.svg"
            width={114}
            height={49}
            alt="logo"
          />
          <div>
            {menu.map((item, idx) => (
              <Link key={idx} href={item.route}>
                <a
                  className={clsx(
                    'px-4 py-3 mr-2 last-of-type:mr-0 rounded-md text-14',
                    { 'bg-gray-200': selected === item.label.toLowerCase() }
                  )}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
          <div className="flex items-center border-solid border-b border-gray-300">
            <label htmlFor="search">
              <Image
                src="/icons/search.svg"
                alt="search"
                width={18}
                height={18}
              />
            </label>
            <input id="search" className="focus:outline-none ml-4 mb-1" />
          </div>
        </Container>
        <Container
          size="large"
          className="flex lg:hidden justify-between items-center"
        >
          <Image
            src="/images/brand/logo.svg"
            width={74}
            height={32}
            alt="logo"
          />
          <i
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center justify-center"
          >
            {!menuOpen ? (
              <Image src="/icons/menu.svg" width={24} height={14} alt="logo" />
            ) : (
              <Image src="/icons/close.svg" width={16} height={16} alt="logo" />
            )}
          </i>
        </Container>
      </div>
      <div
        className={clsx('', s.mobileMenu, {
          'left-0': menuOpen,
          '-left-full': !menuOpen
        })}
      >
        <div className="mt-16 flex flex-col items-center">
          {menu.map((item, idx) => (
            <Link key={idx} href={item.route}>
              <a
                className={clsx('px-4 py-3 rounded-md text-26 font-semibold', {
                  'bg-gray-200': selected === item.label.toLowerCase()
                })}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Nav
