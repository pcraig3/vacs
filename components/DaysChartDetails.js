import { object } from 'prop-types'

import { formatNumberWithCommas, getDayOfYear, getPercent } from '../utils/data'

function DaysChartDetails({ regionData }) {
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
    </details>
  )
}

DaysChartDetails.propTypes = {
  regionData: object.isRequired,
}

export default DaysChartDetails
