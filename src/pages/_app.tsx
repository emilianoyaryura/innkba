import { AppProps } from 'next/app'
import 'css/global.css'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import * as gtag from 'lib/gtag'

const isProduction = process.env.NODE_ENV === 'production'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return <Component {...pageProps} />
}

export default App
