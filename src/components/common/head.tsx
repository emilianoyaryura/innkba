import NextHead from 'next/head'

export type HeadProps = {
  title?: string
  description?: string
  cannonical?: string
  ogImage?: string
}

export const defaultMeta: HeadProps = {
  title: 'Innk ba',
  description: `Revista digital. Nuevo espacio. Nuevas ideas.`,
  cannonical: 'https://www.innkba.com/',
  ogImage: 'https://www.innkba.com/og.png'
}

const Head = ({ headProps }: { headProps: HeadProps }) => {
  return (
    <>
      <NextHead>
        <title>{headProps.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="language" content="es_ES" />
        <meta property="fb:app_id" content="866902667619914" />
        <meta
          name="keywords"
          content="innkba, lifestyle, cultura, historia, arte, literatura, turismo, viajes, viajar, sustentable"
        />
        <meta name="author" content={headProps.title} />
        <link rel="icon" type="image/svg" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="description" content={headProps.description} />
        {/* Open Graph */}
        <meta property="og:url" content={headProps.cannonical} key="ogurl" />
        <meta property="og:image" content={headProps.ogImage} key="ogimage" />
        <meta property="og:type" content="website" />
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
        <meta property="og:image:width" content="299" />
        <meta property="og:image:height" content="299" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@innkba" />
        <meta name="twitter:creator" content="@innkba" />
        <meta name="twitter:image" content={headProps.ogImage} />
        <meta name="twitter:title" content={headProps.title} />
      </NextHead>
    </>
  )
}

export default Head
