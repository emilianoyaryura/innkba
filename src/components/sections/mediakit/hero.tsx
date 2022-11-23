import clsx from 'clsx'
import { motion } from 'framer-motion'
import styles from './mediakit.module.css'
import Image from 'next/image'
import art from '../../../../public/images/mediakit/art.jpg'
import desktopHero from '../../../../public/images/mediakit/hero-desktop.png'
import Container from 'components/layout/container'

const container = {
  hidden: {
    opacity: 0
  },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.01 * i
    }
  })
}

const child = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100
    }
  },
  hidden: {
    opacity: 0,
    y: 10,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100
    }
  }
}

export const ComplexMediakitHero = () => {
  const words = 'mediakit'.split('')
  return (
    <div className="flex flex-col items-end justify-end h-screen max-h-820 w-full overflow-x-hidden overflow-y-hidden">
      <motion.h1
        animate="visible"
        initial="hidden"
        variants={{
          visible: {
            opacity: '1',
            transform: 'translateY(0px)'
          },
          hidden: {
            opacity: '0',
            transform: 'translateY(40px)'
          }
        }}
        transition={{ duration: 0.4, delay: 0.8, type: 'spring' }}
        className="text-56 tracking-tight uppercase font-bold leading-none mr-3 text-gray-400 font-serif"
      >
        Innk ba
      </motion.h1>
      <motion.div
        variants={container}
        animate="visible"
        initial="hidden"
        className={clsx('flex items-center gap-5', styles.hero)}
      >
        {words.map((item, idx) => (
          <motion.h1
            key={idx}
            variants={child}
            className={clsx(
              'tracking-wide uppercase font-extrabold font-serif -mr-6 leading-tight',
              styles.title
            )}
          >
            {item}
          </motion.h1>
        ))}
        <div
          className={clsx('absolute top-10 left-10 max-w-md', styles.floating)}
          style={{ zIndex: '-1' }}
        >
          <Image src={desktopHero} alt="art" />
        </div>
        <div
          className={clsx('absolute top-0 right-72 max-w-xs', styles.floating2)}
          style={{ zIndex: '-1' }}
        >
          <Image src={art} alt="art" />
        </div>
      </motion.div>
    </div>
  )
}

const MediakitHero = () => {
  const words = 'mediakit'.split('')
  return (
    <Container
      size="large"
      className="h-screen max-h-820 w-full flex flex-col items-center justify-center"
    >
      <motion.h1
        animate="visible"
        initial="hidden"
        variants={{
          visible: {
            opacity: '1',
            transform: 'translateY(0px)'
          },
          hidden: {
            opacity: '0',
            transform: 'translateY(20px)'
          }
        }}
        transition={{ duration: 0.4, delay: 0.8, type: 'spring' }}
        className="text-22 uppercase font-bold leading-none mr-3 text-gray-500 mb-2"
      >
        Innk ba
      </motion.h1>
      <motion.div
        variants={container}
        animate="visible"
        initial="hidden"
        className={clsx('flex items-center gap-1', styles.hero)}
      >
        {words.map((item, idx) => (
          <motion.h1
            key={idx}
            variants={child}
            className={clsx(
              'tracking-wide uppercase font-extrabold leading-tight text-48'
            )}
          >
            {item}
          </motion.h1>
        ))}
      </motion.div>
      <motion.h1
        animate="visible"
        initial="hidden"
        variants={{
          visible: {
            opacity: '1',
            transform: 'translateY(0px)'
          },
          hidden: {
            opacity: '0',
            transform: 'translateY(20px)'
          }
        }}
        transition={{ duration: 0.4, delay: 1.3, type: 'spring' }}
        className="text-22 uppercase font-bold leading-none mr-3 text-gray-800 mt-3 absolute top-10 right-10"
      >
        2022
      </motion.h1>
    </Container>
  )
}

export default MediakitHero
