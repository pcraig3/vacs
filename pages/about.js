import Link from 'next/link'

import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout title="About">
      <section>
        <h1>About</h1>
        <p>
          <Link href="/">
            <a>canada-vaccine-tracker dot CA</a>
          </Link>{' '}
          is a little hobby project built by{' '}
          <Link href="https://pcraig3.ca">
            <a target="_blank">Paul Craig</a>
          </Link>{' '}
          over a few weeks mostly by staying up past his bedtime. As such, got a few rough edges for
          its not-that-many-pages. Keeping it small is kind of the point though:{' '}
          <Link href="https://covid19tracker.ca/vaccinationtracker.html">
            <a target="blank">other</a>
          </Link>{' '}
          <Link href="https://globalnews.ca/news/7583050/covid-19-vaccine-tracker-coronavirus-canada/">
            <a target="blank">vaccine</a>
          </Link>{' '}
          <Link href="https://www.cbc.ca/news/canada/track-vaccinations-across-canada-1.5870573">
            <a>trackers</a>
          </Link>{' '}
          already exist, and they are pretty comprehensive.
        </p>
        <p>
          The main goal of this website is to track vaccine distribution in Canada against the
          inexorable march of time.{' '}
          <Link href="/methodology">
            <a>The basic idea</a>
          </Link>{' '}
          is that it would be really good if ~50% of the population received a vaccines by Canada
          Day (~50% of the way through the year), and so let’s make it easy to see at a glance how
          it’s going.
        </p>
        <p>
          It would be cool to incorporate progress over time, (eg, are we ramping up?) so that might
          show up as well.
        </p>
        <p>
          <Link href="https://pcraig3.ca/contact">
            <a target="_blank">Shoot me an email or something</a>
          </Link>{' '}
          if you have any feedback .
        </p>
        <h2>Nuts and bolts</h2>
        <p>
          This is a{' '}
          <Link href="https://nextjs.org/">
            <a target="_blank">Next.js</a>
          </Link>{' '}
          website using{' '}
          <Link href="/data">
            <a>publicly-available data</a>
          </Link>{' '}
          about COVID vaccine distribution in Canada.{' '}
          <Link href="https://github.com/pcraig3/vacs">
            <a target="_blank">It’s fork-able on GitHub</a>
          </Link>
          , so you can create your own completely identical version of this site and try to out-
          <abbr title="search engine optimization">SEO</abbr> me.
        </p>
      </section>

      <style jsx>{`
        h2 {
          margin-top: 1rem;
          font-size: 2.8rem;
          font-weight: 400;
        }
      `}</style>
    </Layout>
  )
}
