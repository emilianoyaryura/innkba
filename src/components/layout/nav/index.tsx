import Image from 'next/image'
import Container from '../container'
import s from './nav.module.css'
import Link from 'next/link'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type Menu = {
  label: string
  route: string
}[]

export type Category =
  | 'lifestyle'
  | 'viajes'
  | 'cultura'
  | 'arte'
  | 'literatura'

export const menu: Menu = [
  {
    label: 'Lifestyle',
    route: '/lifestyle'
  },
  {
    label: 'Viajes',
    route: '/viajes'
  },
  {
    label: 'Cultura',
    route: '/cultura'
  },
  {
    label: 'Arte',
    route: '/arte'
  },
  {
    label: 'Literatura',
    route: '/literatura'
  }
]

const Nav = () => {
  const [scrollsDown, setScrollsDown] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [inputFocusState, setInputFocusState] = useState(false)

  const handleScroll = useCallback(() => {
    if (window.scrollY > 60) {
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

  const router = useRouter()

  const selected = router.asPath
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
          <Link href="/">
            <a className="cursor-pointer">
              <Image
                src="/images/brand/logo.svg"
                width={114}
                height={49}
                alt="logo"
              />
            </a>
          </Link>

          <div>
            {menu.map((item, idx) => (
              <Link key={idx} href={item.route}>
                <a
                  className={clsx(
                    'px-4 py-3 mr-2 last-of-type:mr-0 rounded-md text-14',
                    {
                      'bg-gray-200':
                        selected === `/${item.label.toLowerCase()}`,
                      'hover:bg-gray-50':
                        selected !== `/${item.label.toLowerCase()}`
                    }
                  )}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
          <div
            className={clsx(
              'flex items-center border-solid border-b transition-all duration-200',
              {
                'border-black': inputFocusState,
                'border-gray-300': !inputFocusState
              }
            )}
          >
            <label htmlFor="search">
              {/* Search icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
                  style={{ transition: 'all 0.2s' }}
                  stroke={inputFocusState ? '#000' : '#A0A0A0'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.7498 15.7498L12.4873 12.4873"
                  style={{ transition: 'all 0.2s' }}
                  stroke={inputFocusState ? '#000' : '#A0A0A0'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
            <input
              id="search"
              className="focus:outline-none ml-4 mb-1"
              onFocus={() => setInputFocusState(true)}
              onBlur={() => setInputFocusState(false)}
            />
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
