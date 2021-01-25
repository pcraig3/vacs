import Link from 'next/link'

import Layout from '../components/Layout'

export default function Sources() {
  return (
    <Layout title="Sources">
      <section>
        <h1>Sources</h1>
        <p>All of the data I am using comes from 2 different sources:</p>
        <ol>
          <li>
            Vaccine data:{' '}
            <Link href="https://covid19tracker.ca/vaccinationtracker.html">
              <a target="blank">The COVID-19 Tracker Canada Vaccination page</a>
            </Link>
          </li>
          <li>
            Population data:{' '}
            <Link href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710000901">
              <a target="blank">Statistics Canada population estimate for Q4 2020</a>
            </Link>
          </li>
        </ol>
        <p>
          I’m updating my data manually once per day, but a near-term ambition is to query it
          directly from{' '}
          <Link href="https://api.covid19tracker.ca/docs/1.0/overview">
            <a target="blank">the COVID19Tracker.ca API</a>
          </Link>{' '}
          so it will always be current.
        </p>
      </section>
    </Layout>
  )
}
