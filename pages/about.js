import Layout from '../components/Layout'
import Link from 'next/link'

export default function About() {
  return (
    <Layout title="About">
      <section>
        <h1>About</h1>
        <p>
          <Link href="/methodology">
            <a>Canada-Vaccine-Tracker dot CA</a>
          </Link>{' '}
          is a little hobby project built by{' '}
          <Link href="https://pcraig3.ca">
            <a target="_blank">Paul Craig</a>
          </Link>{' '}
          basically over 3 nights until 4:30 am. As such, it’s likely rife with bugs and so far
          quite limited in functionality. Keeping it small is the intention though:{' '}
          <Link href="/sources">
            <a>other vaccine trackers</a>
          </Link>{' '}
          already exist, and they are pretty comprehensive.
        </p>
        <p>
          The main goal of this website is to track vaccine distribution in Canada against the
          inexorable march of time.{' '}
          <Link href="/methodology">
            <a>The basic idea</a>
          </Link>{' '}
          is that it would be really good if 70% of the population received vaccines by September
          13th (70% of the way through the year).
        </p>
        <p>
          I think it would be cool incorporate progress over time, as well as to have dedicated
          pages for provinces and territories, so those will probably show up eventually.
        </p>
        <p>
          If you have constructive compliments,{' '}
          <Link href="https://pcraig3.ca/contact">
            <a target="_blank">shoot me an email or something</a>
          </Link>
          .
        </p>
        <h2>Nuts and bolts</h2>
        <p>
          This is a{' '}
          <Link href="https://nextjs.org/">
            <a target="_blank">Next.js</a>
          </Link>{' '}
          website using{' '}
          <Link href="/sources">
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
