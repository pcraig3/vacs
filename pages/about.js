import Layout from '../components/Layout'
import Link from 'next/link'

export default function About() {
  return (
    <Layout title="About">
      <section>
        <h1>About</h1>
        <p>
          “We are on track to having every Canadian who wants a vaccine receive one by September,”{' '}
          <Link href="https://www.thestar.com/politics/federal/2021/01/12/justin-trudeau-says-that-canada-will-have-enough-covid-19-vaccines-for-everyone-by-the-end-of-september.html">
            <a target="blank">Justin Trudeau said on January 12, 2021</a>
          </Link>
          .
        </p>
        <p>
          Taking that on its face, this website tracks the progress of vaccine distribution against
          the inexorable march of time.
        </p>
        <p>
          A really good outcome would be 75% of the population receiving vaccines before October 1st
          (75% of the way through the year).
        </p>
      </section>

      <style jsx>{``}</style>
    </Layout>
  )
}
