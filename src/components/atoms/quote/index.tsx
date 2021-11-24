import clsx from 'clsx'
import Container from 'components/layout/container'
import Image from 'next/image'
import { Quote as QuoteProps } from 'ts/models'
import s from './quote.module.css'
import { useInView } from 'react-intersection-observer'

const QuotationMark = () => {
  return (
    <svg
      width="89"
      height="73"
      viewBox="0 0 89 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M58.6821 72.655C54.5908 72.655 51.3608 71.9013 48.9921 70.394C46.8388 68.6713 45.7621 66.4103 45.7621 63.611C45.7621 51.5523 47.7001 40.7857 51.5761 31.311C55.4521 21.621 59.9741 14.0843 65.1421 8.70098C70.5254 3.10232 75.1551 0.302993 79.0311 0.302993C81.3998 0.302993 83.5531 0.73366 85.4911 1.595C87.4291 2.24099 88.3981 3.42532 88.3981 5.14799C88.3981 6.43998 87.4291 9.02398 85.4911 12.9C78.1698 27.5427 74.5091 44.0157 74.5091 62.319C74.5091 65.549 73.4324 68.133 71.2791 70.071C69.1258 71.7937 65.8958 72.655 61.5891 72.655H58.6821ZM13.7851 72.655C9.69375 72.655 6.46375 71.9013 4.09509 70.394C1.94175 68.6713 0.865087 66.4103 0.865087 63.611C0.865087 51.5523 2.80309 40.7857 6.67909 31.311C10.5551 21.621 15.0771 14.0843 20.2451 8.70098C25.6284 3.10232 30.2581 0.302993 34.1341 0.302993C36.5028 0.302993 38.6561 0.73366 40.5941 1.595C42.5321 2.24099 43.5011 3.42532 43.5011 5.14799C43.5011 6.43998 42.5321 9.02398 40.5941 12.9C33.2728 27.5427 29.6121 44.0157 29.6121 62.319C29.6121 65.549 28.5354 68.133 26.3821 70.071C24.2288 71.7937 20.9988 72.655 16.6921 72.655H13.7851Z"
        fill="black"
        fillOpacity="0.85"
      />
    </svg>
  )
}

const SmallQuotationMark = () => {
  return (
    <svg
      width="45"
      height="37"
      viewBox="0 0 45 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.5113 36.6C27.4846 36.6 25.8846 36.2267 24.7113 35.48C23.6446 34.6267 23.1113 33.5067 23.1113 32.12C23.1113 26.1467 24.0713 20.8133 25.9913 16.12C27.9113 11.32 30.1513 7.58666 32.7113 4.91999C35.3779 2.14666 37.6713 0.759996 39.5913 0.759996C40.7646 0.759996 41.8313 0.97333 42.7913 1.4C43.7513 1.71999 44.2313 2.30666 44.2313 3.15999C44.2313 3.79999 43.7513 5.07999 42.7913 6.99999C39.1646 14.2533 37.3513 22.4133 37.3513 31.48C37.3513 33.08 36.8179 34.36 35.7513 35.32C34.6846 36.1733 33.0846 36.6 30.9513 36.6H29.5113ZM7.27125 36.6C5.24458 36.6 3.64458 36.2267 2.47125 35.48C1.40458 34.6267 0.87125 33.5067 0.87125 32.12C0.87125 26.1467 1.83125 20.8133 3.75125 16.12C5.67125 11.32 7.91125 7.58666 10.4713 4.91999C13.1379 2.14666 15.4313 0.759996 17.3513 0.759996C18.5246 0.759996 19.5913 0.97333 20.5513 1.4C21.5113 1.71999 21.9913 2.30666 21.9913 3.15999C21.9913 3.79999 21.5113 5.07999 20.5513 6.99999C16.9246 14.2533 15.1113 22.4133 15.1113 31.48C15.1113 33.08 14.5779 34.36 13.5113 35.32C12.4446 36.1733 10.8446 36.6 8.71125 36.6H7.27125Z"
        fill="black"
        fillOpacity="0.85"
      />
    </svg>
  )
}

const Quote = ({ quote, author }: QuoteProps) => {
  const { ref, inView } = useInView()
  return (
    <div ref={ref}>
      <Container size="large" className={s.quote}>
        <div className="relative flex flex-col max-w-md md:max-w-5xl mx-auto -mb-28">
          <i
            className={clsx(
              'hidden md:flex absolute top-0 left-0 opacity-0',
              inView && s.mark
            )}
          >
            <QuotationMark />
          </i>
          <i
            className={clsx(
              'absolute md:hidden top-0 left-0 opacity-0',
              inView && s.mark
            )}
          >
            <SmallQuotationMark />
          </i>
          <h1
            className={clsx(
              'font-medium text-22 md:text-38 md:leading-snug text-center pt-10 pl-5 md:pt-20 md:pl-16 opacity-0',
              s.text
            )}
          >
            {quote}
          </h1>
          <div
            className={clsx(
              'flex flex-col items-end self-end mt-5 opacity-0',
              inView && s.author
            )}
          >
            <Image
              src={author.image}
              alt={author.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <p className="my-2 text-18 md:text-22 font-bold">{author.name}</p>
            <p className="font-bold text-12">
              {author.dates.birth}{' '}
              {author.dates.death && ` - ${author.dates.death}`}
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Quote
