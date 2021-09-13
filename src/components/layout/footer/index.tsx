import Container from '../container'
import Image from 'next/image'
import { menu } from '../nav'
import Link from 'next/link'

const Footer = () => {
  return (
    <Container
      size="large"
      className="grid grid-cols-2 gap-12 justify-items-start sm:grid-cols-4 mt-60 mb-28"
    >
      <div>
        <h1 className="uppercase font-semibold text-18 mb-5">Social</h1>
        <div className="flex flex-col">
          <Link href="https://twitter.com/innkba" passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mb-4"
            >
              <i className="mr-3 flex items-center justify-center">
                <Image
                  src="/icons/twitter.svg"
                  alt="twitter"
                  width={18}
                  height={18}
                />
              </i>
              <p>Twitter</p>
            </a>
          </Link>
          <Link
            href="https://www.facebook.com/Innk-ba-102751985452293"
            passHref
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mb-4"
            >
              <i className="mr-3 flex items-center justify-center">
                <Image
                  src="/icons/facebook.svg"
                  alt="facebook"
                  width={18}
                  height={18}
                />
              </i>
              <p>Facebook</p>
            </a>
          </Link>
          <Link href="https://www.instagram.com/innkba/?hl=es-la" passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <i className="mr-3 flex items-center justify-center">
                <Image
                  src="/icons/instagram.svg"
                  alt="instagram"
                  width={18}
                  height={18}
                />
              </i>
              <p>Instagram</p>
            </a>
          </Link>
        </div>
      </div>
      <div>
        <h1 className="uppercase font-semibold text-18 mb-5">Contacto</h1>
        <a href="mailto:emilianoyaryurat@gmail.com">hola@innkba.com</a>
      </div>
      <div>
        <h1 className="uppercase font-semibold text-18 mb-5">Blog</h1>
        <div className="flex flex-col">
          {menu.map((item, idx) => (
            <Link key={idx} href={item.route}>
              <a className="mb-4">{item.label}</a>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start sm:items-end">
        <Image
          src="/images/brand/logo.svg"
          width={114}
          height={49}
          alt="logo"
        />
        <p className="mt-4 text-left sm:text-right">
          © {new Date().getFullYear()} Innk BA all rights reserved
        </p>
      </div>
    </Container>
  )
}

export default Footer
