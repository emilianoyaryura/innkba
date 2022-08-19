import GAScript from 'lib/gtag'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@docsearch/css@alpha"
          />
        </Head>
        <body>
          <GAScript />
          <Main />
          <NextScript />
          <script src="https://cdn.jsdelivr.net/npm/@docsearch/react@alpha"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
