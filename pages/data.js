import Link from 'next/link'

import fetch from 'node-fetch'
import { array, object, string } from 'prop-types'

import Layout from '../components/Layout'
import LastUpdated from '../components/LastUpdated'

import { mergeData } from '../data'
import { formatNumberWithCommas } from '../utils/data'
import { space } from '../styles/_theme'

const abbr = 'CAN'

const Data = ({ canadaData, regionsData, lastUpdated }) => {
  canadaData = mergeData({ abbr, data: canadaData })

  // https://stackoverflow.com/a/35092754
  regionsData.sort((a, b) => a.province.localeCompare(b.province))

  return (
    <Layout title="Raw data">
      <section>
        <h1>Raw data</h1>
        <p>
          I use the{' '}
          <Link href="https://api.covid19tracker.ca/docs/1.0/overview">
            <a target="blank">COVID19Tracker.ca API</a>
          </Link>{' '}
          for vaccine-related data, and{' '}
          <Link href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710000901">
            <a target="blank">Statistics Canada</a>
          </Link>{' '}
          for regional population estimates.
        </p>

        <LastUpdated datetime={lastUpdated} />

        <p className="smalltext">
          <em>(Scroll the table the sideways to see all of the data.)</em>
        </p>
        <div className="table-container">
          <table>
            <caption>Vaccine data by region</caption>
            <tr>
              <th scope="col">Region</th>
              <th scope="col">Population</th>
              <th scope="col">Vaccine doses administered</th>
              <th scope="col">People fully vaccinated</th>
              <th scope="col">People who have received a vaccine</th>
            </tr>

            <tr>
              <th scope="row">Canada</th>
              <td>{formatNumberWithCommas(canadaData.population)}</td>
              <td>{formatNumberWithCommas(canadaData.total_vaccinations)}</td>
              <td>{formatNumberWithCommas(canadaData.total_vaccinated)}</td>
              <td>{formatNumberWithCommas(canadaData.total_received_vaccine)}</td>
            </tr>

            {regionsData.map((data) => {
              let regionData = mergeData({ abbr: data.province, data })
              return (
                <tr key={regionData.province}>
                  <th scope="row">{regionData.name}</th>
                  <td>{formatNumberWithCommas(regionData.population)}</td>
                  <td>{formatNumberWithCommas(regionData.total_vaccinations)}</td>
                  <td>{formatNumberWithCommas(regionData.total_vaccinated)}</td>
                  <td>{formatNumberWithCommas(regionData.total_received_vaccine)}</td>
                </tr>
              )
            })}
          </table>
        </div>
        <h2>Terms</h2>
        <ul>
          <li>
            <strong>Vaccine doses administered:</strong> Total vaccine doses used in a given region.
          </li>
          <li>
            <strong>People fully vaccinated:</strong> Number of people that have received{' '}
            <em>both</em> doses of the vaccine, by region.
          </li>
          <li>
            <strong>People who have received a vaccine:</strong> Number of people that have received{' '}
            <em>at least one</em> dose of the vaccine, by region.
          </li>
        </ul>
      </section>
      <style jsx>{`
        .smalltext {
          display: none;
        }

        @media only screen and (max-width: 1000px) {
          .table-container {
            width: 100%;
          }
        }

        @media only screen and (max-width: 680px) {
          .table-container {
            box-shadow: inset -15px 0 10px -15px #000000;
          }

          .smalltext {
            display: block;
          }
        }

        table caption {
          visibility: hidden;
        }

        h2 {
          margin-top: ${space.xl};
        }
      `}</style>
    </Layout>
  )
}

Data.propTypes = {
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

export default Data
