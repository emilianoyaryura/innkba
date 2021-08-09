import SectionLayout from 'components/layout/sectionLayout'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import Button from 'components/primitives/button'

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

const Arrow = () => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

const SmallArrow = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slidesPerView: 1,
    spacing: 16,
    duration: 1000
  })
  return (
    <SectionLayout title={title} copy={copy}>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
        <i className="hidden md:flex cursor-pointer" onClick={slider?.prev}>
          <Arrow />
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
          className="hidden md:flex cursor-pointer transform rotate-180"
        >
          <Arrow />
        </i>
        <div className="flex md:hidden mt-4 space-x-4">
          <i onClick={slider?.prev} className="cursor-pointer">
            <SmallArrow />
          </i>
          <i
            onClick={slider?.next}
            className="cursor-pointer transform rotate-180"
          >
            <SmallArrow />
          </i>
        </div>
      </div>
    </SectionLayout>
  )
}

export default Slider
