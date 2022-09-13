import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import s from './nav.module.css'
import { Menu } from '.'

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
      className={clsx('flex lg:hidden', s.mobileMenu, {
        'left-0': menuOpen,
        '-left-full': !menuOpen
      })}
    >
      <div className="mt-8 flex flex-col items-center">
        {menu.map((item, idx) => (
          <Link key={idx} href={item.route}>
            <a
              className={clsx(
                'px-4 py-3 rounded-md text-22 font-semibold noDecoration',
                {
                  'bg-gray-200': selected === item.label.toLowerCase()
                }
              )}
            >
              {item.label}
            </a>
          </Link>
        ))}
      </div>
      <div>
        <div style={{ height: '1px' }} className="w-full bg-gray-300 my-8" />
        <div className="flex items-center space-x-6 justify-center">
          <Link href="https://twitter.com/innkba" passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center noDecoration"
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
              className="flex items-center noDecoration"
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
              className="flex items-center noDecoration"
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
          className="text-16 flex flex-col max-w-max mx-auto mt-6 noDecoration"
          href="mailto:contacto@innkba.com"
          aria-label="contact mail"
        >
          <span>contacto@innkba.com</span>
          <span style={{ height: '2px' }} className="w-full bg-black" />
        </a>
      </div>
    </div>
  )
}
