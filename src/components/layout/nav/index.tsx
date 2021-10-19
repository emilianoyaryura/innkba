import Image from 'next/image'
import Container from '../container'
import s from './nav.module.css'
import Link from 'next/link'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ContentfulPost } from 'ts/models'
import { useRef } from 'react'

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
    label: 'Viajes',
    route: '/viajes'
  },
  {
    label: 'Arte',
    route: '/arte'
  },
  {
    label: 'Cultura',
    route: '/cultura'
  },
  {
    label: 'Lifestyle',
    route: '/lifestyle'
  },
  {
    label: 'Literatura',
    route: '/literatura'
  }
]

const Nav = ({ posts }: { posts: ContentfulPost[] }) => {
  const [scrollsDown, setScrollsDown] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [inputFocusState, setInputFocusState] = useState(false)
  const [search, setSearch] = useState('')
  const [searcherFilter, setSearcherFilter] = useState<ContentfulPost[] | null>(
    null
  )
  const [searcherFocused, setSearcherFocused] = useState(false)
  const searcherRef = useRef<any>(null)

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

  useEffect(() => {
    menuOpen
      ? (document.body.style.overflow = 'hidden')
      : document.body.style.removeProperty('overflow')
  }, [menuOpen])

  useEffect(() => {
    const filteredPosts = posts.filter((post) =>
      post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    return setSearcherFilter(filteredPosts)
  }, [posts, search])

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(e) {
      if (searcherRef.current && !searcherRef.current.contains(e.target)) {
        setSearcherFocused(false)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searcherRef])

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
                    'px-4 py-3 mr-2 last-of-type:mr-0 rounded-md text-15 font-medium',
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
              'flex items-center border-solid border-b transition-all duration-200 relative',
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
              onFocus={() => {
                setInputFocusState(true)
                setSearcherFocused(true)
              }}
              onBlur={() => setInputFocusState(false)}
              onChange={(e) => {
                const value = e.target.value
                setSearcherFocused(true)
                setSearch(value)
              }}
            />
            {search && searcherFocused && (
              <div
                style={{ maxHeight: '450px', width: '400px' }}
                ref={searcherRef}
                className="absolute space-y-3 right-0 top-8 bg-white rounded-lg shadow-md overflow-y-auto p-5"
              >
                {searcherFilter?.map((post, idx) => (
                  <Link
                    href={`/${post.category.toLocaleLowerCase()}/${post.slug}`}
                    key={idx}
                  >
                    <a className="flex">
                      <img
                        src={post.image.src ?? ''}
                        alt={post.title}
                        className="object-cover h-20 w-24 rounded"
                      />
                      <p className="ml-2 text-16 leading-tight font-medium">
                        {post.title}
                      </p>
                    </a>
                  </Link>
                ))}
              </div>
            )}
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
        <div className="mt-8 flex flex-col items-center">
          {menu.map((item, idx) => (
            <Link key={idx} href={item.route}>
              <a
                className={clsx('px-4 py-3 rounded-md text-22 font-semibold', {
                  'bg-gray-200': selected === item.label.toLowerCase()
                })}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </div>
        <div style={{ height: '1px' }} className="w-full bg-gray-300 my-8" />
        <div className="flex items-center space-x-6 justify-center">
          <Link href="https://twitter.com/innkba" passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Image
                src="/icons/twitter.svg"
                alt="twitter"
                width={22}
                height={22}
              />
            </a>
          </Link>
          <Link
            href="https://www.facebook.com/Innk-ba-102751985452293"
            passHref
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Image
                src="/icons/facebook.svg"
                alt="facebook"
                width={22}
                height={22}
              />
            </a>
          </Link>
          <Link href="https://www.instagram.com/innkba/?hl=es-la" passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Image
                src="/icons/instagram.svg"
                alt="instagram"
                width={22}
                height={22}
              />
            </a>
          </Link>
        </div>
        <a
          className="text-16 flex flex-col max-w-max mx-auto mt-6"
          href="mailto:emilianoyaryurat@gmail.com"
          aria-label="contact mail"
        >
          <span>hola@innkba.com</span>
          <span style={{ height: '2px' }} className="w-full bg-black" />
        </a>
      </div>
    </>
  )
}

export default Nav
