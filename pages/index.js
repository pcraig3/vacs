import Link from 'next/link'

import fetch from 'node-fetch'
import { array, object, string } from 'prop-types'
import ScrollTo from 'react-scroll-into-view'

import Layout from '../components/Layout'
import LastUpdated from '../components/LastUpdated'
import MeasuringVaccinated from '../components/MeasuringVaccinated'
import VacsVaccinesDaysChart from '../components/charts/VacsVaccinesDaysChart'
import VacsVaccinesRegionsChart from '../components/charts/VacsVaccinesRegionsChart'

import { mergeData } from '../data'

const abbr = 'CAN'

const Home = ({ canadaData, regionsData, lastUpdated }) => {
  canadaData = mergeData({ abbr, data: canadaData })

  return (
    <Layout title={`Vaccine recipients in Canada`}>
      <div>
        <section>
          <h1>
            <span className="visuallyHidden">Vaccine recipients in </span>Canada
          </h1>

          <ScrollTo selector="#by-region">
            <p className="aside smalltext hide-on-mobile">
              <a href="#by-region" onClick={(e) => e.preventDefault()}>
                Percentages by region<span aria-hidden="true"> 👇</span>
              </a>
            </p>
          </ScrollTo>
          <VacsVaccinesDaysChart data={canadaData} abbr={abbr}>
            <p>
              Comparing the percentage of Canadians who have received vaccines <em>vs.</em> the
              percentage of days passed in 2021.
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

          <ScrollTo selector="#measuring-vaccinated">
            <p>
              <a href="#measuring-vaccinated" onClick={(e) => e.preventDefault()}>
                *Measuring “vaccinated”<span aria-hidden="true"> 👇</span>
              </a>
            </p>
          </ScrollTo>
        </section>

        <section>
          <h2 id="by-region">
            <span className="visuallyHidden">Vaccine recipients in Canada </span>By region
          </h2>
          <p className="aside smalltext">
            <Link href="/regions">
              <a>
                Pick a region<span aria-hidden="true"> 👉</span>
              </a>
            </Link>
          </p>

          <VacsVaccinesRegionsChart data={regionsData}>
            <p>
              Percentage of Canadians who have received vaccines across all provinces and
              territories <em>vs.</em> the percentage of days passed in 2021.
            </p>
          </VacsVaccinesRegionsChart>
          <LastUpdated datetime={lastUpdated} />

          <MeasuringVaccinated demonym={canadaData.demonym} />
        </section>
      </div>
    </Layout>
  )
}

Home.propTypes = {
  canadaData: object,
  regionsData: array,
  lastUpdated: string,
}

// This gets called on every request
export async function getServerSideProps() {
  // get data for all of Canada
  // when data comes back it looks like { data: [{ }], last_updated: "datetime" }
  const { data: [canadaData] = [], last_updated: lastUpdated } = await fetch(
    'https://api.covid19tracker.ca/summary',
  ).then((response) => response.json())

  // get data for different regions in Canada
  // when data comes back it looks like { data: [{ }, { }, { }, ...], last_updated: "datetime" }
  const { data: [...regionsData] = [] } = await fetch(
    'https://api.covid19tracker.ca/summary/split',
  ).then((response) => response.json())

  // Pass data to the page via props
  return { props: { canadaData, regionsData, lastUpdated } }
}

export default Home
