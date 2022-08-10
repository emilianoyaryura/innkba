import { AppProps } from 'next/app'

import { useAppGA } from 'lib/gtag'

import 'css/global.css'
import 'css/cmdk.scss'

const App = ({ Component, pageProps }: AppProps) => {
  useAppGA()
  // @ts-ignore
  return <Component {...pageProps} />
}

export default App
