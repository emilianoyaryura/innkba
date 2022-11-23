import clsx from 'clsx'
import { useAnimation, motion } from 'framer-motion'
import { ReactNode, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type FadeInProps = {
  children: ReactNode
  className?: string
  fullWidth?: boolean
  delay?: number
}

const variant = {
  visible: { opacity: 1, translateY: 0, transition: { duration: 0.6 } },
  hidden: { opacity: 0, translateY: 100 }
}

const FadeIn = ({
  children,
  className,
  delay = 0,
  fullWidth = false,
  ...props
}: FadeInProps) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      // controls.start("visible");
      controls.start((_) => ({
        opacity: 1,
        translateY: 0,
        transition: { duration: 0.6, delay: delay }
      }))
    }
  }, [controls, inView, delay])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variant}
      className={clsx('', className, {
        'w-full': fullWidth
      })}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
