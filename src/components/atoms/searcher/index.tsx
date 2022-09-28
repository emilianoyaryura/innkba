import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Command } from 'cmdk'
import { SearcherCategories, TinyPost } from 'ts/models'
import { useRouter } from 'next/router'
import PlaneIcon from '../icons/plane'

export function Searcher({ posts }: { posts: TinyPost[] }) {
  const [value, setValue] = useState('linear')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.removeProperty('overflow')
    }
  }, [isOpen])

  // @ts-ignore
  function useOutsideAlerter(ref) {
    useEffect(() => {
      // @ts-ignore
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  useOutsideAlerter(wrapperRef)

  const categories: SearcherCategories[] = [
    'Lifestyle',
    'Arte y Literatura',
    'Viajes',
    'Cultura',
    'Escritores'
  ]

  const postsDividedByCategory = categories.map((c) => {
    return {
      category: c,
      posts: posts.filter((p) => p?.category === c)
    }
  })

  return (
    <>
      <button
        aria-label="search engine button"
        className="p-2 bg-gray-50 rounded-md"
        onClick={() => {
          setIsOpen(true)
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
        <div className="fixed w-screen h-screen flex pt-16 lg:pt-0 lg:items-center justify-center left-0 top-0 px-4">
          <div ref={wrapperRef} className="raycast">
            <Command value={value} onValueChange={(v) => setValue(v)}>
              <div cmdk-raycast-top-shine="" />
              <Command.Input ref={inputRef} autoFocus placeholder="Buscar..." />
              <hr cmdk-raycast-loader="" />
              <Command.List ref={listRef}>
                <Command.Empty>No se encontraron resultados.</Command.Empty>
                {postsDividedByCategory.map((c, idx) => (
                  <Command.Group heading={c.category} key={idx}>
                    {c.posts?.map((p) => (
                      <Item
                        setIsOpen={setIsOpen}
                        value={p.title}
                        key={p.title}
                        post={p}
                      >
                        {p.title}
                      </Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  )
}

function Item({
  children,
  value,
  post,
  setIsOpen
}: {
  children: ReactNode
  value: string
  post: TinyPost
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()
  return (
    <Command.Item
      value={value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
      onSelect={() => {
        router.push(post.href)
        setIsOpen(false)
      }}
    >
      {post.tag === 'Diario de Viaje' && <PlaneIcon />}
      {children}
      {post?.tag && <span cmdk-raycast-meta="">{post.tag}</span>}
    </Command.Item>
  )
}

export default Searcher
