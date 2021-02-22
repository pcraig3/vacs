import { object } from 'prop-types'

import { colors, space } from '../styles/_theme'

import { formatNumberWithCommas, getDayOfYear, getPercent } from '../utils/data'

function ChartDetails({ regionData }) {
  return (
    <details>
      <summary>Figure 1 — Vaccine data for {regionData.name}</summary>
      <div className="details-container">
        <p>
          In {regionData.name} (pop. {formatNumberWithCommas(regionData.population)}),{' '}
          {formatNumberWithCommas(regionData.total_received_vaccine)} people have received at least
          one dose of the vaccine, and {formatNumberWithCommas(regionData.total_vaccinated)} are
          fully vaccinated.
        </p>

        <div className="table-container">
          <table>
            <caption>
              Vaccinations in {regionData.name} <em>vs.</em> days in 2021
            </caption>
            <tr>
              <th scope="col"></th>
              <th scope="col">Raw data</th>
              <th scope="col">Percent</th>
            </tr>
            <tr>
              <th scope="row">{regionData.demonym} fully vaccinated</th>
              <td>
                {formatNumberWithCommas(regionData.total_vaccinated)} /{' '}
                {formatNumberWithCommas(regionData.population)}
              </td>
              <td>
                {getPercent({
                  numerator: regionData.total_vaccinated,
                  denominator: regionData.population,
                })}
                %
              </td>
            </tr>
            <tr>
              <th scope="row">{regionData.demonym} who have recevied a vaccine</th>
              <td>
                {formatNumberWithCommas(regionData.total_received_vaccine)} /{' '}
                {formatNumberWithCommas(regionData.population)}
              </td>
              <td>
                {getPercent({
                  numerator: regionData.total_received_vaccine,
                  denominator: regionData.population,
                })}
                %
              </td>
            </tr>
            <tr>
              <th scope="row">Days passed in 2021</th>
              <td>{getDayOfYear()} / 365</td>
              <td>{getPercent({ numerator: getDayOfYear(), denominator: 365 })}%</td>
            </tr>
          </table>
        </div>
      </div>
      <style jsx>{`
        details {
          border: 2px solid ${colors.lightGrey};
          border-radius: 3px;
          margin-bottom: ${space.md};
        }

        summary {
          cursor: pointer;
          background: ${colors.veryLightGrey};
          padding: ${space.xs};
          border-radius: 3px;
          border-bottom: 2px solid transparent;
          outline-color: ${colors.linkText};
        }

        details[open] summary {
          border-bottom: 2px solid ${colors.lightGrey};
        }

        .details-container {
          padding: ${space.sm} ${space.xs};
        }

        table {
          width: 100%;
        }

        th[scope='col'] {
          text-align: right;
        }

        th[scope='row'] {
          max-width: 25%;
        }
      `}</style>
    </details>
  )
}

ChartDetails.propTypes = {
  regionData: object.isRequired,
}

export default ChartDetails
