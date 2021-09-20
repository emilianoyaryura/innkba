import s from './header.module.css'
import Container from 'components/layout/container'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import Button from 'components/primitives/button'

const TravelHeader = () => {
  const [email, setEmail] = useState('')
  console.log(email)
  return (
    <Container
      size="large"
      className={clsx('flex flex-col items-center pt-24', s.container)}
    >
      <h1 className="font-bold text-48 max-w-2xl text-center tracking-tight leading-smooth">
        Conocé el mundo de una manera diferente
      </h1>
      <div className="flex flex-col items-center mt-6 -mb-12 z-50">
        <p className="text-16 font-medium text-black mb-4">
          Te gustaría compartir tus viajes en Innk BA?
        </p>
        <div className="flex space-x-5">
          <input
            type="email"
            placeholder="Ingresa tu mail y nos contactaremos"
            onChange={(e) => {
              const value = e.target.value
              setEmail(value)
            }}
            className="text-gray-400 w-80 bg-gray-200 rounded-md py-3 px-4 text-14 font-normal"
          />
          <Button size="small" type="secondary" className="px-12">
            Enviar
          </Button>
        </div>
      </div>
      <Image
        src="/images/travel-header.svg"
        alt="Travel header"
        objectFit="cover"
        height={414}
        width={1100}
      />
    </Container>
  )
}

export default TravelHeader
