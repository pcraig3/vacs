import Link from 'next/link'

import React from 'react'
import { array, string } from 'prop-types'
import fetch from 'node-fetch'

import LastUpdated from '../../components/LastUpdated'
import Layout from '../../components/Layout'
import VacsVaccinesDaysChart from '../../components/charts/VacsVaccinesDaysChart'
import MeasuringVaccinated from '../../components/MeasuringVaccinated'

import { mergeData } from '../../data'

class Region extends React.Component {
  constructor() {
    super()
    this.state = { maxDomain: 67 }
  }

  render() {
    let { abbr, data = [], lastUpdated } = this.props

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
            <VacsVaccinesDaysChart data={regionData} maxDomain={this.state.maxDomain}>
              <p>
                Comparing the percentage of {regionData.demonym} who have received vaccines{' '}
                <em>vs.</em> the number of days passed in 2021.
              </p>
              <p className="smalltext">
                (We’re hoping for{' '}
                <Link href="/methodology">
                  <a>
                    {this.state.maxDomain === 100
                      ? '~70% vaccinated by Labour Day'
                      : '~45-55% vaccinated by Canada Day'}
                  </a>
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
