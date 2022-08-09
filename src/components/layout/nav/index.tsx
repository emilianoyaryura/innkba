import Image from 'next/image'
import Container from '../container'
import s from './nav.module.css'
import Link from 'next/link'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MobileHeader } from './mobileHeader'
import Searcher from 'components/atoms/searcher'
import { TinyPost } from 'ts/models'

export type Menu = {
  label: string
  route: string
}[]

export const menu: Menu = [
  {
    label: 'Viajes',
    route: '/viajes'
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
    label: 'Arte y Literatura',
    route: '/arte-y-literatura'
  }
]

const Nav = ({ posts }: { posts: TinyPost[] }) => {
  const [scrollsDown, setScrollsDown] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
            <a className="cursor-pointer noDecoration">
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
                    'px-4 py-3 mr-2 last-of-type:mr-0 rounded-md text-15 font-medium noDecoration',
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
          <Searcher posts={posts} />
        </Container>
        <Container
          size="large"
          className="flex lg:hidden justify-between items-center"
        >
          <Link href="/">
            <Image
              src="/images/brand/logo.svg"
              width={74}
              height={32}
              alt="logo"
            />
          </Link>
          <div className="flex">
            <Searcher posts={posts} />
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center justify-center p-2 w-10 ml-4"
            >
              {!menuOpen ? (
                <Image
                  src="/icons/menu.svg"
                  width={24}
                  height={14}
                  alt="logo"
                />
              ) : (
                <Image
                  src="/icons/close.svg"
                  width={16}
                  height={16}
                  alt="logo"
                />
              )}
            </button>
          </div>
        </Container>
      </div>
      <MobileHeader menu={menu} selected={selected} menuOpen={menuOpen} />
    </>
  )
}

export default Nav
