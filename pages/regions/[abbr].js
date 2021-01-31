import Link from 'next/link'

import { array, string } from 'prop-types'
import fetch from 'node-fetch'

import Layout from '../../components/Layout'
import LastUpdated from '../../components/LastUpdated'
import VacsVaccinesDaysChart from '../../components/charts/VacsVaccinesDaysChart'
import { mergeData } from '../../data'

const Region = ({ abbr, data = [], lastUpdated }) => {
  // if empty array, set to empty object
  data = data.length === 0 ? {} : data
  const regionData = mergeData({ abbr, data })

  return (
    <Layout title={`Vaccine recipients in ${regionData.name}`}>
      <div>
        <section>
          <h1>
            <span className="visuallyHidden">Vaccine recipients in </span>
            {regionData.name}
          </h1>
          <VacsVaccinesDaysChart data={regionData}>
            <p>
              Comparing the percentage of {regionData.demonym} who have received vaccines vs the
              number of days passed in 2021.
            </p>
            <p className="smalltext">
              (We’re hoping for{' '}
              <Link href="/methodology">
                <a>~70% vaccinated by September 13</a>
              </Link>
              .)
            </p>
          </VacsVaccinesDaysChart>
          <LastUpdated datetime={lastUpdated} />

          <h3>
            <span aria-hidden="true">*</span>More info
          </h3>
          <p className="smalltext">
            “Vaccinated” is a little ambiguous. Both vaccines currently used in Canada require 2
            doses (several weeks apart) to be fully effective. However, receiving 1 dose is
            partially effective, and indicates how quickly we are dispensing vaccines.
          </p>
          <p className="smalltext">
            The smaller number tracks how many people in {regionData.name} have received both doses.
            The larger number tracks how many people in {regionData.name} have received at least 1
            dose. For a more thorough write-up, check out the{' '}
            <Link href="/methodology">
              <a>Methodology</a>
            </Link>
            .
          </p>
        </section>
      </div>
    </Layout>
  )
}

Region.propTypes = {
  abbr: string,
  data: array,
  lastUpdated: string,
}

// This gets called on every request
export async function getServerSideProps(context) {
  const { params: { abbr } = {} } = context
  const abbrs = Object.keys(require('../../data/_regions.json')).filter((abbr) => abbr !== 'CAN')

  // if !params or params.abbr not in expected params (case-sensitive), then 404
  if (!abbr || !abbrs.includes(abbr)) {
    return { notFound: true }
  }

  // get data for different regions in Canada
  // when data comes back it looks like { data: [{ }, { }, { }, ...], last_updated: "datetime" }
  const { data: [...regionsData] = [], last_updated: lastUpdated } = await fetch(
    'https://api.covid19tracker.ca/summary/split',
  ).then((response) => response.json())

  // Pass data to the page via props
  return { props: { abbr, data: regionsData, lastUpdated } }
}

export default Region
