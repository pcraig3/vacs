import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../config/gtag'

import { func, object } from 'prop-types'

import '../public/reset.css'
import '../public/global.css'

function MyApp({ Component, pageProps }) {
  if (process.env.NODE_ENV === 'production') {
    const router = useRouter()
    useEffect(() => {
      const handleRouteChange = (url) => {
        gtag.pageview(url)
      }
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }, [router.events])
  }

  return <Component {...pageProps} />
}

MyApp.propTypes = {
  Component: func.isRequired,
  pageProps: object,
}

export default MyApp
