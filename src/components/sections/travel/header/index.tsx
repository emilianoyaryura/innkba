import s from './header.module.css'
import Container from 'components/layout/container'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import Button from 'components/primitives/button'
import toast, { Toaster } from 'react-hot-toast'

const TravelHeader = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })

  const validateEmail = (email: string) => {
    const res =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return res.test(String(email).toLowerCase())
  }

  const handleResponse = ({ status, msg }: { status: number; msg: any }) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg }
      })
      toast('Gracias! Estaremos en contacto', {
        duration: 4000,
        position: 'top-center',
        // Styling
        style: {
          background: '#17B927',
          color: 'white',
          padding: '8px 16px'
        },
        icon: '👏'
      })

      setTimeout(() => {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: false, msg: null }
        })
        setEmail('')
      }, 4000)
    } else {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: msg }
      })
    }
  }

  const handleSend = async () => {
    if (validateEmail(email)) {
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
    } else {
      toast('Oops, el mail debe ser válido', {
        duration: 4000,
        position: 'top-center',
        // Styling
        style: {
          background: '#B91717',
          color: 'white',
          padding: '8px 16px'
        },
        icon: '😡'
      })
    }
  }

  return (
    <Container
      size="large"
      className={clsx(
        'flex flex-col items-center pt-20 sm:pt-28 lg:pt-24',
        s.container
      )}
    >
      <Toaster />
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
            className="text-gray-500 w-80 bg-gray-200 rounded-md py-3 px-4 text-14 font-normal"
          />
          <Button
            onClick={handleSend}
            size="small"
            type="secondary"
            className="justify-center items-center"
          >
            {status.submitted ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-1"
              >
                <path
                  d="M18.71 7.20998C18.617 7.11625 18.5064 7.04186 18.3846 6.99109C18.2627 6.94032 18.132 6.91418 18 6.91418C17.868 6.91418 17.7373 6.94032 17.6154 6.99109C17.4936 7.04186 17.383 7.11625 17.29 7.20998L9.84 14.67L6.71 11.53C6.61348 11.4367 6.49954 11.3634 6.37468 11.3142C6.24983 11.265 6.1165 11.2409 5.98232 11.2432C5.84814 11.2455 5.71573 11.2743 5.59265 11.3278C5.46957 11.3812 5.35824 11.4585 5.265 11.555C5.17176 11.6515 5.09845 11.7654 5.04924 11.8903C5.00004 12.0152 4.97591 12.1485 4.97823 12.2827C4.98055 12.4168 5.00928 12.5493 5.06277 12.6723C5.11627 12.7954 5.19348 12.9067 5.29 13L9.13 16.84C9.22296 16.9337 9.33356 17.0081 9.45542 17.0589C9.57728 17.1096 9.70799 17.1358 9.84 17.1358C9.97201 17.1358 10.1027 17.1096 10.2246 17.0589C10.3464 17.0081 10.457 16.9337 10.55 16.84L18.71 8.67998C18.8115 8.58634 18.8925 8.47269 18.9479 8.34619C19.0033 8.21969 19.0319 8.08308 19.0319 7.94498C19.0319 7.80688 19.0033 7.67028 18.9479 7.54378C18.8925 7.41728 18.8115 7.30363 18.71 7.20998Z"
                  fill="white"
                />
              </svg>
            ) : (
              'Enviar'
            )}
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
