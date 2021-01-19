import Layout from '../components/Layout'
import Link from 'next/link'

export default function About() {
  return (
    <Layout title="Sources">
      <section>
        <h1>Sources</h1>
        <p>There are two really awesome sources I use for vaccine data in Canada:</p>
        <ul>
          <li>
            <Link href="https://covid19tracker.ca/vaccinationtracker.html">
              <a target="blank">The COVID-19 Tracker Canada Vaccination page</a>
            </Link>
          </li>
          <li>
            <Link href="https://www.ctvnews.ca/health/coronavirus/coronavirus-vaccine-tracker-how-many-people-in-canada-have-received-shots-1.5247509">
              <a target="blank">CTV’s Coronavirus Vaccine Tracker</a>
            </Link>
          </li>
        </ul>
        <p>
          They mostly agree with each other, although when there are small discrepancies between
          them, I prefer the COVID-19 Tracker data.
        </p>
        <p>
          I’m updating my data manually a couple times per day, but a near-term ambition is to query
          it directly from{' '}
          <Link href="https://api.covid19tracker.ca/docs/1.0/overview">
            <a target="blank">the COVID19Tracker.ca API</a>
          </Link>{' '}
          so it will always be current.
        </p>
      </section>
    </Layout>
  )
}
