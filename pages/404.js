import Link from 'next/link'

import Layout from '../components/Layout'

export default function Custom404() {
  return (
    <Layout title="404 — Not Found">
      <section>
        <h1>404 — Not Found</h1>
        <p>
          There are only like 4 pages on this site, so if you weren’t able to find what you were
          looking for, it definitely doesn’t exist.
        </p>
        <p>
          I know it’s not very original, but you could try{' '}
          <Link href="/">
            <a>the homepage</a>
          </Link>{' '}
          <span aria-hidden="true">(🏡)</span>.
        </p>
      </section>

      <style jsx>{``}</style>
    </Layout>
  )
}
