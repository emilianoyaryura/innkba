import clsx from 'clsx'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { ContentfulPost } from 'ts/models'
import s from './searcher.module.css'
import Link from 'next/link'
import { getSectionSlug } from 'lib/utils/section'

const Searcher = ({ posts }: { posts: ContentfulPost[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const searcherInputRef = useRef<HTMLInputElement | null>(null)
  const postsContainerRef = useRef<HTMLDivElement | null>(null)
  const [search, setSearch] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<ContentfulPost[]>(posts)
  const [focusedPost, setFocusedPost] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.removeProperty('overflow')
    }
  }, [isOpen])

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
      : posts
    setFilteredPosts(filter)
  }, [search, posts])

  const keyPress = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      } else if (event.keyCode === 38 && isOpen) {
        setFocusedPost((prev) => (prev <= 0 ? 0 : prev - 1))
      } else if (event.keyCode === 40 && isOpen) {
        setFocusedPost((prev) =>
          prev >= filteredPosts?.length - 1
            ? filteredPosts?.length - 1
            : prev + 1
        )
      }
    },
    [filteredPosts?.length, isOpen]
  )

  useEffect(() => {
    document.addEventListener('keydown', keyPress, false)

    return () => {
      document.removeEventListener('keydown', keyPress, false)
    }
  }, [keyPress])

  useEffect(() => {
    const currentFocusedPost = document.getElementById(
      filteredPosts[focusedPost]?.title
    )
    // const topPosition = currentFocusedPost ? currentFocusedPost?.offsetTop : 0

    // const postsContainer = postsContainerRef.current

    // const scrolled = postsContainer?.scrollTop

    return () => {
      currentFocusedPost?.scrollIntoView({
        // top: topPosition,
      })
    }
  }, [filteredPosts, focusedPost])

  return (
    <>
      <button
        aria-label="search engine button"
        className="p-2 bg-gray-50 rounded-md"
        onClick={() => {
          setIsOpen(true)
          setTimeout(() => {
            searcherInputRef.current && searcherInputRef.current.focus()
          }, 100)
        }}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
          />
        </svg>
      </button>
      {isOpen && (
        <>
          <div onClick={() => setIsOpen(false)} className={s.overlay} />
          <div
            className={clsx('rounded-xl overflow-auto flex flex-col', s.modal)}
          >
            <div className="sticky top-0 pb-2 bg-white">
              <input
                ref={searcherInputRef}
                onChange={(e) => {
                  const value = e.target.value
                  setSearch(value)
                }}
                type="text"
                className="text-gray-800 border-b border-gray-300 border-solid px-6 flex min-w-full pt-5 pb-4 placeholder-gray-500 focus:outline-none"
                placeholder="Buscar..."
              />
            </div>
            <div className="px-3 flex flex-col pb-2" ref={postsContainerRef}>
              {filteredPosts?.map((post, idx) => (
                <Link
                  key={idx}
                  href={`/${getSectionSlug(post.category)}/${post.slug}`}
                >
                  <a
                    onMouseEnter={() => setFocusedPost(idx)}
                    id={post.title}
                    className={clsx(
                      'px-6 py-4 rounded-lg text-gray-800 noDecoration',
                      {
                        'bg-gray-100': focusedPost == idx
                      }
                    )}
                  >
                    {post.title}{' '}
                    <span className="ml-1 text-14 text-gray-600">
                      en {post.category}
                    </span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Searcher

// const MyCombobox = ({ posts }: { posts: ContentfulPost[] }) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [search, setSearch] = useState('')
//   const [filteredPosts, setFilteredPosts] = useState<ContentfulPost[] | null>(
//     null
//   )
//   const inputRef = useRef(null)
//   const [focusedPost, setFocusedPost] = useState(filteredPosts?.[0])

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden'
//     } else {
//       document.body.style.removeProperty('overflow')
//     }
//   }, [isOpen])

//   useEffect(() => {
//     const filter = search
//       ? posts?.filter(
//           (p) =>
//             p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
//             p.author[0].name
//               .toLocaleLowerCase()
//               .includes(search.toLocaleLowerCase()) ||
//             p.tag.toLocaleLowerCase().includes(search.toLocaleLowerCase())
//         )
//       : null
//     setFilteredPosts(filter)
//   }, [search, posts])

//   return (
//     <>
//       <button
//         aria-label="search engine button"
//         className="p-2 bg-gray-50 rounded-md"
//         onClick={() => {
//           setIsOpen(true)
//           setTimeout(() => {
//             // @ts-ignore
//             inputRef.current && inputRef.current.focus()
//           }, 100)
//         }}
//       >
//         <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
//           <path
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.5"
//             d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
//           />
//         </svg>
//       </button>
//       {isOpen && (
//         <>
//           <div onClick={() => setIsOpen(false)} className={s.overlay} />
//           <Combobox value={focusedPost} onChange={(e) => setFocusedPost(e)}>
//             <div
//               className={clsx(
//                 'rounded-xl overflow-auto flex flex-col pb-2',
//                 s.modal
//               )}
//             >
//               <div className="sticky top-0 pb-2">
//                 <Combobox.Input
//                   ref={inputRef}
//                   className="text-gray-800 border-b border-gray-300 border-solid px-6 flex min-w-full pt-5 pb-4 placeholder-gray-500 focus:outline-none"
//                   onChange={(event) => setSearch(event.target.value)}
//                   // @ts-ignore
//                   displayValue={(post) => post.title}
//                   // @ts-ignore
//                   autocomplete="off"
//                 />
//               </div>
//               <Transition
//                 as={Fragment}
//                 leave="transition ease-in duration-100"
//                 leaveFrom="opacity-100"
//                 leaveTo="opacity-0"
//                 afterLeave={() => setSearch('')}
//               >
//                 <Combobox.Options className="overflow-auto px-2 py-1">
//                   {filteredPosts?.length === 0 && search !== '' ? (
//                     <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
//                       No se encontraron resultados.
//                     </div>
//                   ) : (
//                     filteredPosts?.map((post) => (
//                       <Combobox.Option
//                         key={post.title}
//                         value={post.title}
//                         onSelect={() => console.log(post.title)}
//                       >
//                         {({ active }) => (
//                           <li
//                             key={post.title}
//                             className={`${
//                               active
//                                 ? 'rounded-lg text-gray-800 bg-gray-100 noDecoration'
//                                 : 'rounded-lg text-gray-800 noDecoration'
//                             }`}
//                           >
//                             <Link
//                               href={`/${getSectionSlug(post.category)}/${
//                                 post.slug
//                               }`}
//                             >
//                               <a className="noDecoration px-6 py-4 flex items-center">
//                                 {post.title}
//                                 <span className="ml-2 text-14 text-gray-600">
//                                   en {post.category}
//                                 </span>
//                               </a>
//                             </Link>
//                           </li>
//                         )}
//                       </Combobox.Option>
//                     ))
//                   )}
//                 </Combobox.Options>
//               </Transition>
//             </div>
//           </Combobox>
//         </>
//       )}
//     </>
//   )
// }

// export default MyCombobox
