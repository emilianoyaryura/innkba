import clsx from 'clsx'
import FadeIn from 'components/common/fadeIn'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

type CounterProps = {
  to: number
  isPurple?: boolean
  label: string
  onEnd?: string
  delay?: number
  duration?: number
  suffix?: string
}

const Counter = ({
  to,
  isPurple,
  delay,
  label,
  duration,
  onEnd = '',
  suffix
}: CounterProps) => {
  const [hasEnded, setHasEnded] = useState(false)
  const [showsUp, setShowsUp] = useState(false)
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      setShowsUp(true)
    }
  }, [inView])

  return (
    <div ref={ref} className="flex flex-col items-start lg:min-w-[180px]">
      <FadeIn delay={delay}>
        {hasEnded && showsUp ? (
          <h1
            className={clsx(
              'text-38 sm:text-48 md:text-80 font-semibold leading-none',
              {
                'text-violet': isPurple
              }
            )}
          >
            {onEnd}
          </h1>
        ) : !hasEnded && showsUp ? (
          <CountUp
            end={to}
            delay={0.5}
            duration={duration}
            onEnd={() => {
              if (onEnd === '') return
              setHasEnded(true)
            }}
            suffix={suffix ?? ''}
            className={clsx(
              'text-38 sm:text-48 md:text-80 font-semibold leading-none',
              {
                'text-violet': isPurple
              }
            )}
          />
        ) : null}
        <p
          className={clsx('text-14 sm:text-16 md:text-20 font-semibold', {
            'text-violet': isPurple
          })}
        >
          {label}
        </p>
      </FadeIn>
    </div>
  )
}

const Counters = () => {
  return (
    <div className="grid grid-cols-3 justify-items-center py-60">
      <Counter duration={3} to={100} label="visitas" onEnd="+100k" suffix="k" />
      <Counter
        duration={2}
        delay={0.2}
        to={22}
        label="usuarios"
        onEnd="+22k"
        suffix="k"
      />
      <Counter
        delay={0.4}
        duration={2.5}
        to={140}
        isPurple
        label="escritores"
        onEnd="+140"
      />
    </div>
  )
}

export default Counters
