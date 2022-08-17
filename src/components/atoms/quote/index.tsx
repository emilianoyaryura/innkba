import clsx from 'clsx'
import Container from 'components/layout/container'
import { Quote as QuoteProps } from 'ts/models'

const Quote = ({ quote, author, className }: QuoteProps) => {
  return (
    <div className={clsx('px-4', className)}>
      <Container
        size="large"
        className="my-36 bg-offBlue border border-solid border-gray-100 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-12 box-border px-8 py-8 sm:py-12 md:py-16 sm:px-16 rounded-2xl"
      >
        <div className="max-w-md md:max-w-5xl mx-auto mt-4 flex flex-col items-center md:items-start">
          <h2 className="font-extrabold text-14 uppercase">
            Quote de la semana
          </h2>
          <h1
            className={clsx(
              'font-medium text-22 md:text-28 text-center md:text-left lg:text-38 md:leading-snug mt-2 md:mt-4 lg:mt-6'
            )}
          >
            "{quote}"
          </h1>
        </div>
        <div className={clsx('flex flex-col')}>
          <img
            src={author.image}
            alt={author.name}
            className="w-auto h-auto rounded-lg"
            style={{ maxWidth: 320 }}
          />
          {/* <Image
            src={author.image}
            alt={author.name}
            width={420}
            height={400}
            className="rounded-lg"
          /> */}
          <p className="mt-2 text-18 lg:text-22 font-bold self-end">
            {author.name}
          </p>
          <p className="font-bold text-12 self-end">
            {author.dates.birth}{' '}
            {author.dates.death && ` - ${author.dates.death}`}
          </p>
        </div>
      </Container>
    </div>
  )
}

export default Quote
