import clsx from 'clsx'
import s from './preFooter.module.css'
import Container from '../container'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { useState } from 'react'

const mailchimpUrl =
  'https://innkba.us5.list-manage.com/subscribe/post?u=7012bc9dafd55d01858c2ad2d&amp;id=37c216145e'

const PreFooter = () => {
  const [email, setEmail] = useState('')
  const [clearErr, setClearErr] = useState('')
  return (
    <Container size="large" className="flex flex-col items-center mt-80">
      <h1 className={clsx('uppercase text-center', s.title)}>
        suscribite a nuestra <br /> newsletter
      </h1>
      <MailchimpSubscribe
        url={mailchimpUrl}
        render={({ message, status, subscribe }) => (
          <form
            className="mt-8 sm:mt-14 flex flex-col w-full mx-auto"
            onSubmit={(e) => {
              e.preventDefault()
              subscribe({ EMAIL: email })
              setClearErr(`${status}`)
              setTimeout(() => {
                setClearErr('')
              }, 10000)
            }}
          >
            <div className="flex flex-col items-center justify-center md:flex-row space-y-3 md:space-y-0 md:space-x-4">
              <input
                type="email"
                required
                pattern=" /^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/"
                maxLength={50}
                onChange={(e) => {
                  const value = e.target.value
                  setEmail(value)
                }}
                className="bg-gray-200 placeholder-gray-500 w-full max-w-sm text-center md:text-left py-4 rounded-lg text-14 px-5 outline-none transition-all duration-200 border-2 border-solid border-gray-200 focus:border-blue focus:outline-none"
                placeholder="Ingresa tu mail para más novedades"
              />
              <button
                aria-label="Submit button"
                type="submit"
                className="px-9 py-4 w-full max-w-sm md:max-w-max mx-auto md:mx-0 rounded-lg text-white font-semibold text-14 cursor-pointer text-center transition-all duration-150 bg-blue hover:opacity-95"
              >
                Suscribirse
              </button>
            </div>
            <p className={clsx('mt-3 ml-1 text-14', s.error)}>
              {clearErr === ''
                ? ''
                : status === 'success'
                ? 'Gracias por suscribirte! Estaremos en contacto.'
                : status === 'error'
                ? message
                : ''}
            </p>
          </form>
        )}
      />
    </Container>
  )
}

export default PreFooter
