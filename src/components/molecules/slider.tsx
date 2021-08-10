import SectionLayout from 'components/layout/sectionLayout'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import Button from 'components/primitives/button'
import clsx from 'clsx'
import { useState } from 'react'

export type SlideProps = {
  title?: string
  img: string
  link?: {
    label?: string
    href: string
  }
}

export type SliderProps = {
  title?: string
  copy?: string
  slides: SlideProps[]
}

const Arrow = ({ isDisabled }: { isDisabled?: boolean }) => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('transition-all duration-150', {
        'opacity-30': isDisabled
      })}
    >
      <path
        d="M19.168 29.668L36.4355 19.6986L36.4355 39.6374L19.168 29.668Z"
        fill="black"
      />
      <circle
        cx="30"
        cy="30"
        r="29"
        transform="rotate(90 30 30)"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  )
}

const SmallArrow = ({ isDisabled }: { isDisabled?: boolean }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('transition-all duration-150', {
        'opacity-30': isDisabled
      })}
    >
      <path
        d="M12.7787 19.7787L24.2903 13.1324L24.2903 26.4249L12.7787 19.7787Z"
        fill="black"
      />
      <circle
        cx="20"
        cy="20"
        r="19"
        transform="rotate(90 20 20)"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  )
}

const Slider = ({ title, copy, slides }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slidesPerView: 1,
    spacing: 16,
    duration: 1000,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    }
  })
  return (
    <SectionLayout title={title} copy={copy}>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
        <i
          className={clsx('hidden md:flex', {
            'cursor-not-allowed': currentSlide == 0,
            'cursor-pointer': currentSlide != 0
          })}
          onClick={slider?.prev}
        >
          <Arrow isDisabled={currentSlide == 0} />
        </i>
        <div ref={sliderRef} className="keen-slider  md:mx-16">
          {slides?.map((slide, idx) => (
            <div className="keen-slider__slide relative" key={idx}>
              <Image
                src={slide.img}
                width={1040}
                height={600}
                alt={slide.title ?? `slide ${idx}`}
                className="rounded-xl"
              />
              {slide.link?.href && (
                <Button
                  href={slide.link.href}
                  className="absolute bottom-4 right-4 md:bottom-8 md:right-8"
                >
                  {slide.link.label ?? 'Ver Más'}
                </Button>
              )}
            </div>
          ))}
        </div>
        <i
          onClick={slider?.next}
          className={clsx('hidden md:flex transform rotate-180', {
            'cursor-not-allowed': currentSlide >= slides.length - 1,
            'cursor-pointer': currentSlide < slides.length - 1
          })}
        >
          <Arrow isDisabled={currentSlide >= slides.length - 1} />
        </i>
        <div className="flex md:hidden mt-4 space-x-4">
          <i onClick={slider?.prev} className="cursor-pointer">
            <SmallArrow isDisabled={currentSlide == 0} />
          </i>
          <i
            onClick={slider?.next}
            className="cursor-pointer transform rotate-180"
          >
            <SmallArrow isDisabled={currentSlide >= slides.length - 1} />
          </i>
        </div>
      </div>
    </SectionLayout>
  )
}

export default Slider
