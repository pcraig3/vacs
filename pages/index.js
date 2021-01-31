import Link from 'next/link'

import fetch from 'unfetch'
import useSWR from 'swr'

import Layout from '../components/Layout'
import LastUpdated from '../components/LastUpdated'
import VacsVaccinesDaysChart from '../components/charts/VacsVaccinesDaysChart'
import VacsVaccinesRegionsChart from '../components/charts/VacsVaccinesRegionsChart'

import { mergeData } from '../data'

const fetcher = (url) => fetch(url).then((r) => r.json())
const abbr = 'CAN'

const Home = () => {
  // when data comes back it looks like { data: [{ }], last_updated: "datetime" }
  let { data: { data: [_data] = [], last_updated: lastUpdated } = {} } = useSWR(
    'https://api.covid19tracker.ca/summary',
    fetcher,
  )

  const regionData = mergeData({ abbr, data: _data })

  return (
    <Layout title={`Vaccine recipients in Canada`}>
      <div>
        <section>
          <h1>
            <span className="visuallyHidden">Vaccine recipients in </span>Canada
          </h1>
          <VacsVaccinesDaysChart data={regionData} abbr={abbr}>
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

          <h3>
            <span aria-hidden="true">*</span>More info
          </h3>
          <p className="smalltext">
            “Vaccinated” is a little ambiguous. Both vaccines currently used in Canada require 2
            doses (several weeks apart) to be fully effective. However, receiving 1 dose is
            partially effective, and indicates how quickly we are dispensing vaccines.
          </p>
          <p className="smalltext">
            The smaller number tracks how many Canadians have received both doses. The larger number
            tracks how many Canadians have received at least 1 dose. For a more thorough write-up,
            check out the{' '}
            <Link href="/methodology">
              <a>Methodology</a>
            </Link>
            .
          </p>
        </section>

        <section>
          <h2>
            <span className="visuallyHidden">Vaccine recipients in Canada </span>By region
          </h2>

          <VacsVaccinesRegionsChart>
            <p>
              Percentage of Canadians who have received vaccines across all provinces and
              territories <em>vs.</em> the percentage of days passed in 2021.
            </p>
            <p className="smalltext">
              (Or, choose{' '}
              <Link href="/regions">
                <a>a specific region in Canada</a>
              </Link>
              .)
            </p>
          </VacsVaccinesRegionsChart>

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
            The percentages above track how many Canadians from each region have received at least 1
            dose.
          </p>
        </section>
      </div>
    </Layout>
  )
}

export default Home
