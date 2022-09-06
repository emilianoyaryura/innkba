import NextHead from 'next/head'

export type HeadProps = {
  title?: string
  description?: string
  cannonical?: string
  ogImage?: string
}

const defaultMeta: HeadProps = {
  title: 'Innk Ba',
  description: `Un nuevo espacio para nuevas historias`,
  cannonical: 'https://www.innkba.com/',
  ogImage: 'https://www.innkba.com/og.png'
}

const Head = ({ headProps = defaultMeta }: { headProps?: HeadProps }) => {
  return (
    <>
      <NextHead>
        <title>{headProps.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="language" content="es_ES" />
        <meta property="fb:app_id" content="700702790744238" />

        <meta name="author" content={headProps.title} />
        <link rel="icon" type="image/svg" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="description" content={headProps.description} />

        {/* Open Graph */}
        <meta property="og:url" content={headProps.cannonical} key="ogurl" />
        <meta property="og:image" content={headProps.ogImage} key="ogimage" />
        <meta
          property="og:site_name"
          content={headProps.title}
          key="ogsitename"
        />
        <meta property="og:title" content={headProps.title} key="ogtitle" />
        <meta
          property="og:description"
          content={headProps.description}
          key="ogdesc"
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content={headProps.title} key="twhandle" />
      </NextHead>
    </>
  )
}

export default Head
