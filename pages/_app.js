import { func, object } from 'prop-types'

import '../public/reset.css'
import '../public/global.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.propTypes = {
  Component: func.isRequired,
  pageProps: object,
}

export default MyApp
