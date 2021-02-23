import { array, object, oneOfType, string } from 'prop-types'

import Link from 'next/link'

import HTMLHead from '../components/head'
import Header from '../components/Header'
import { colors, space } from '../styles/_theme'

function Layout({ children, title }) {
  return (
    <div className="container">
      <HTMLHead title={title ? `${title} — Canada Vaccine Tracker` : 'Canada Vaccine Tracker'} />

      <Header />
      <main>{children}</main>
      <footer>
        Made with{' '}
        <span role="img" aria-label="spaghetti">
          🍝
        </span>{' '}
        by{' '}
        <Link href="https://twitter.com/pcraig3">
          <a target="_blank">@pcraig3</a>
        </Link>{' '}
        in frigid Ottawa,{' '}
        <Link href="/regions/ON">
          <a>Ontario</a>
        </Link>
        .
        <br />
        Stay safe out there folx! <span aria-hidden="true">✌️</span>
      </footer>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }

        main {
          padding: ${space.sm} ${space.sm};
          flex: 1 0 auto;
        }

        footer {
          font-size: 1.1rem;
          color: ${colors.darkGrey};
          padding: ${space.xs} ${space.md};
          background: ${colors.veryLightGrey};
          text-align: right;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  )
}

Layout.propTypes = {
  children: oneOfType([array, object]).isRequired,
  title: string,
}

export default Layout
