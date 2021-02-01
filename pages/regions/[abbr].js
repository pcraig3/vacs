import Link from 'next/link'

import { array, string } from 'prop-types'
import fetch from 'node-fetch'

import Layout from '../../components/Layout'
import LastUpdated from '../../components/LastUpdated'
import VacsVaccinesDaysChart from '../../components/charts/VacsVaccinesDaysChart'
import MeasuringVaccinated from '../../components/MeasuringVaccinated'

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

          <MeasuringVaccinated demonym={regionData.demonym} />
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
