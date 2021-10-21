import s from './header.module.css'
import Container from 'components/layout/container'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import Button from 'components/primitives/button'

const TravelHeader = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })

  console.log(status)

  const handleResponse = ({ status, msg }: { status: number; msg: any }) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg }
      })
    } else {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: msg }
      })
    }
  }

  const handleSend = async () => {
    const res = await fetch('/api/sendgrid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })

    const text = await res.text

    handleResponse({ msg: text, status: res.status })
  }

  return (
    <Container
      size="large"
      className={clsx(
        'flex flex-col items-center pt-20 sm:pt-28 lg:pt-24',
        s.container
      )}
    >
      <h1 className="font-bold text-32 sm:text-48 max-w-2xl text-center tracking-tight leading-smooth">
        Conocé el mundo de una manera diferente
      </h1>
      <div className="flex flex-col items-center mt-6 -mb-8 sm:mb-20 md:mb-12 lg:-mb-12 z-50">
        <p className="text-14 sm:text-16 font-medium text-center text-black mb-4">
          Te gustaría compartir tus viajes en Innk BA?
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-5">
          <input
            type="email"
            value={email}
            placeholder="Ingresa tu mail y nos contactaremos"
            onChange={(e) => {
              const value = e.target.value
              setEmail(value)
            }}
            className="text-gray-400 w-80 bg-gray-200 rounded-md py-3 px-4 text-14 font-normal"
          />
          <Button
            onClick={handleSend}
            size="small"
            type="secondary"
            className="px-12"
          >
            Enviar
          </Button>
        </div>
      </div>
      <div className="hidden sm:flex">
        <Image
          src="/images/travel-header.svg"
          alt="Travel header"
          objectFit="cover"
          height={414}
          width={1100}
        />
      </div>
      <div className="flex sm:hidden">
        <Image
          src="/images/travel-header-mobile.svg"
          alt="Travel header"
          objectFit="cover"
          height={390}
          width={474}
        />
      </div>
    </Container>
  )
}

export default TravelHeader
