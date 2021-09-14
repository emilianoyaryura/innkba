import clsx from 'clsx'
import s from './preFooter.module.css'
import Container from '../container'
import Button from '../../primitives/button'

const PreFooter = () => {
  return (
    <Container size="large" className="flex flex-col items-center mt-80">
      <h1 className={clsx('uppercase text-center', s.title)}>
        suscribite a nuestra <br /> newsletter
      </h1>
      <div className="mt-8 sm:mt-14 flex flex-col sm:flex-row w-full sm:w-min">
        <input
          type="email"
          className="bg-gray-200 w-full text-center sm:text-left mb-3 sm:mb-0 py-4 mr-4 rounded-lg text-14 px-5 outline-none transition-all duration-200 border-2 border-solid border-gray-200 focus:border-blue focus:outline-none sm:w-96"
          placeholder="Ingresa tu mail para más novedades"
        />
        <Button type="primary">Suscribirse</Button>
      </div>
    </Container>
  )
}

export default PreFooter
