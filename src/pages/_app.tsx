import { AppProps } from 'next/app'
import 'css/global.css'
import { useAppGA } from 'lib/gtag'

const App = ({ Component, pageProps }: AppProps) => {
  useAppGA()
  return <Component {...pageProps} />
}

export default App
