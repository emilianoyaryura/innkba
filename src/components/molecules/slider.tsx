import SectionLayout from 'components/layout/sectionLayout'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import clsx from 'clsx'
import { useState } from 'react'
import Button from 'components/primitives/button'

export type SlideProps = {
  title?: string
  img: string
}

export type SliderProps = {
  title?: string
  copy?: string
  slides: SlideProps[]
  link?: {
    href: string
    label?: string
  }
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

const Slider = ({ title, copy, slides, link }: SliderProps) => {
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
        <button
          className={clsx('hidden md:flex', {
            'cursor-not-allowed': currentSlide == 0,
            'cursor-pointer': currentSlide != 0
          })}
          onClick={slider?.prev}
        >
          <Arrow isDisabled={currentSlide == 0} />
        </button>
        <div className="flex-col flex md:mx-16">
          <div ref={sliderRef} className="keen-slider flex">
            {slides?.map((slide, idx) => (
              <div className="keen-slider__slide relative" key={idx}>
                <Image
                  src={slide.img}
                  width={1040}
                  height={600}
                  alt={slide.title ?? `slide ${idx}`}
                  className="rounded-xl"
                />
              </div>
            ))}
          </div>
          {link && (
            <Button
              href={link?.href}
              type="alternative"
              className="self-center mr-0 md:self-end md:-mr-9"
            >
              {link?.label ?? 'Ver más'}
            </Button>
          )}
        </div>
        <button
          onClick={slider?.next}
          className={clsx('hidden md:flex transform rotate-180', {
            'cursor-not-allowed': currentSlide >= slides.length - 1,
            'cursor-pointer': currentSlide < slides.length - 1
          })}
        >
          <Arrow isDisabled={currentSlide >= slides.length - 1} />
        </button>
        <div className="flex md:hidden mt-4 space-x-4">
          <button onClick={slider?.prev} className="cursor-pointer">
            <SmallArrow isDisabled={currentSlide == 0} />
          </button>
          <button
            onClick={slider?.next}
            className="cursor-pointer transform rotate-180"
          >
            <SmallArrow isDisabled={currentSlide >= slides.length - 1} />
          </button>
        </div>
      </div>
    </SectionLayout>
  )
}

export default Slider
