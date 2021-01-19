import { string, object } from 'prop-types'

import HTMLHead from '../components/head'
import Header from '../components/Header'
import { space } from '../styles/_theme'

function Layout({ children, title = 'Canada Vaccines Tracker' }) {
  return (
    <div>
      <HTMLHead title={title} />

      <Header />
      <main>{children}</main>

      <style jsx>{`
        main {
          padding: ${space.sm} ${space.sm};
        }
      `}</style>
    </div>
  )
}

Layout.propTypes = {
  children: object.isRequired,
  title: string,
}

export default Layout
