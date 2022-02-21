import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getSectionSlug } from 'lib/utils/section'
import { ContentfulPost } from 'ts/models'
import Link from 'next/link'

const SearchItem = ({
  href,
  label,
  category
}: {
  href: string
  label: string
  category: string
}) => {
  return (
    <Link href={href} passHref>
      <a href={href} aria-label={label}>
        {category} - {label}
      </a>
    </Link>
  )
}

const Searcher = ({ posts }: { posts: ContentfulPost[] }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState('')
  const searcherRef = useRef<any>(null)
  const [filteredPosts, setFilteredPosts] = useState<ContentfulPost[] | null>(
    null
  )

  const handleChange = useCallback((e) => {
    const value = e.target.value
    setSearch(value)
  }, [])

  useEffect(() => {
    /**
     * If clicked on outside of element
     */
    function handleClickOutside(e: any) {
      if (searcherRef.current && !searcherRef.current.contains(e.target)) {
        setIsFocused(false)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searcherRef])

  useEffect(() => {
    const filter = search
      ? posts?.filter(
          (p) =>
            p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
            p.author[0].name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()) ||
            p.tag.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : null
    setFilteredPosts(filter)
  }, [search])

  return (
    <div ref={searcherRef} className="hidden lg:flex flex-col relative">
      <form
        className={clsx(
          'flex items-center border-solid border-b transition-all duration-150 relative w-52',
          {
            'border-gray-300': !isFocused,
            'border-gray-500': isFocused
          }
        )}
      >
        <label htmlFor="searcher">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx('', {
              'text-gray-500': !isFocused,
              'text-gray-700': isFocused
            })}
          >
            <path
              d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
              style={{ transition: 'all 0.2s' }}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-150"
            />
            <path
              d="M15.7498 15.7498L12.4873 12.4873"
              style={{ transition: 'all 0.2s' }}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-150"
            />
          </svg>
        </label>
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => handleChange(e)}
          autoComplete="off"
          type="text"
          aria-label="search engine"
          id="searcher"
          className="outline-none pl-3 text-black"
        />
      </form>
      {filteredPosts && (
        <div className="flex flex-col absolute top-full">
          {filteredPosts &&
            filteredPosts.map((post, idx) => (
              <SearchItem
                key={idx}
                label={post.title}
                href={`${getSectionSlug(post.category)}/${post.slug}`}
                category={post.category}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default Searcher
