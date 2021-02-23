import { array } from 'prop-types'

import { mergeData } from '../data'
import { formatNumberWithCommas, getDayOfYear, getPercent, sortByKey } from '../utils/data'

function RegionsChartDetails({ regionsData }) {
  regionsData = regionsData.map((region) =>
    mergeData({
      abbr: region.province,
      data: region,
    }),
  )
  sortByKey({ data: regionsData, key: 'percentage_received_vaccine', sortBy: 'ascending' })

  return (
    <details>
      <summary>Figure 2 — Vaccine rollout data by region</summary>
      <div className="details-container">
        <p>
          In Canada, we are hoping to have around 45-55% of Canadians vaccinated by Canada Day (50%
          of the way through the year). In essense, we want the percentage of days passed to be
          similar to the percentage of the population vaccinated.
        </p>

        <div className="table-container">
          <table>
            <caption>
              Percent of Canadians who have received a vaccine by region <em>vs.</em> days in 2021
            </caption>
            <tr>
              <th scope="col" className="region-header">
                Region
              </th>
              <th scope="col">Raw data</th>
              <th scope="col">Percent</th>
            </tr>
            {regionsData.map((regionData) => {
              return (
                <tr key={regionData.province}>
                  <th scope="row">{regionData.name}</th>
                  <td>
                    {formatNumberWithCommas(regionData.total_received_vaccine)} /{' '}
                    {formatNumberWithCommas(regionData.population)}
                  </td>
                  <td>{regionData.percentage_received_vaccine}%</td>
                </tr>
              )
            })}
            <tr>
              <th scope="row">Days passed in 2021</th>
              <td>{getDayOfYear()} / 365</td>
              <td>{getPercent({ numerator: getDayOfYear(), denominator: 365 })}%</td>
            </tr>
          </table>
        </div>
      </div>
      <style jsx>{`
        .region-header {
          text-align: left;
        }
      `}</style>
    </details>
  )
}

RegionsChartDetails.propTypes = {
  regionsData: array.isRequired,
}

export default RegionsChartDetails
