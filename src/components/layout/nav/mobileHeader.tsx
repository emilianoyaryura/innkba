import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import s from './nav.module.css'
import { Menu } from '.'
import { useState } from 'react'
import { useEffect } from 'react'
import { ContentfulPost } from 'ts/models'

export const MobileSearcher = ({
  onClick,
  posts
}: {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined
  posts: ContentfulPost[]
}) => {
  const [search, setSearch] = useState('')
  const [searcherFilter, setSearcherFilter] = useState<ContentfulPost[] | null>(
    null
  )

  useEffect(() => {
    const filteredPosts = posts.filter((post) =>
      post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    return setSearcherFilter(filteredPosts)
  }, [posts, search])

  return (
    <div
      style={{ zIndex: 100 }}
      className={clsx(
        'w-screen h-screen fixed top-0 left-0 px-8 sm:px-16 py-10'
      )}
    >
      <div className={clsx('bg-white p-8 flex flex-col mx-auto rounded-lg')}>
        <label
          htmlFor="search"
          className="border-b border-solid border-gray-300 flex w-full"
        >
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
              stroke="#A0A0A0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.7498 15.7498L12.4873 12.4873"
              style={{ transition: 'all 0.2s' }}
              stroke="#A0A0A0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            id="search"
            className="focus:outline-none ml-4 mb-1"
            onChange={(e) => {
              const value = e.target.value
              setSearch(value)
            }}
          />
        </label>
        {search && (
          <div
            style={{ maxHeight: '400px' }}
            className="w-full overflow-y-auto mt-2"
          >
            {searcherFilter?.map((post, idx) => (
              <Link
                href={`/${post.category.toLocaleLowerCase()}/${post.slug}`}
                key={idx}
              >
                <a className="flex py-4 transition-all duration-150 hover:bg-gray-200 rounded-md">
                  <img
                    src={post.image.src ?? ''}
                    alt={post.title}
                    className="object-cover h-16 w-20 rounded"
                  />
                  <p className="ml-2 text-14 leading-tight font-medium">
                    {post.title}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div
        onClick={onClick}
        style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: -1 }}
        className={clsx('absolute w-full h-full top-0 left-0')}
      />
    </div>
  )
}

export const MobileHeader = ({
  menuOpen,
  selected,
  menu
}: {
  menu: Menu
  menuOpen: boolean
  selected: string
}) => {
  return (
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
        <Link href="https://www.facebook.com/Innk-ba-102751985452293" passHref>
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
  )
}
