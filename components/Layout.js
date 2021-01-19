import { array, object, oneOfType, string } from 'prop-types'

import Link from 'next/link'

import HTMLHead from '../components/head'
import Header from '../components/Header'
import { colors, space } from '../styles/_theme'

function Layout({ children, title = 'Canada Vaccines Tracker' }) {
  return (
    <div className="container">
      <HTMLHead title={title} />

      <Header />
      <main>{children}</main>
      <footer>
        Made with{' '}
        <Link href="https://nextjs.org/">
          <a target="_blank">Next.js</a>
        </Link>{' '}
        by{' '}
        <Link href="https://pcraig3.ca/contact">
          <a target="_blank">@pcraig3</a>
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
