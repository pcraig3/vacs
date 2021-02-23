import { object } from 'prop-types'

const _territories = ['NT', 'NU', 'YT']

import { mergeData } from '../data'
import { formatNumberWithCommas } from '../utils/data'

const isProvince = (region = {}) => {
  return region.province ? !_territories.includes(region.province) : false
}

const getProvinceBySorted = ({ abbr, regionsData }) => {
  let region = regionsData.find((r) => r.province === abbr)
  return mergeData({ abbr, data: region })
}

const getPosition = (position) => {
  position += 1

  switch (position) {
    case 1:
      return '1st'
    case 2:
      return '2nd'
    case 3:
      return '3rd'
    default:
      return `${position}th`
  }
}

function RelativePosition({ data: region, sortedData, regionsData }) {
  let percentDifference

  sortedData = isProvince(region)
    ? sortedData.filter((r) => !_territories.includes(r.x))
    : sortedData.filter((r) => _territories.includes(r.x))

  const sortedPosition = sortedData.findIndex((r) => r.x === region.province)

  const regionAhead =
    sortedPosition > 0
      ? getProvinceBySorted({ abbr: sortedData[sortedPosition - 1].x, regionsData })
      : false
  const regionBehind =
    sortedPosition !== sortedData.length - 1
      ? getProvinceBySorted({ abbr: sortedData[sortedPosition + 1].x, regionsData })
      : false

  if (regionAhead) {
    percentDifference =
      Math.round(
        (regionAhead.percentage_received_vaccine - region.percentage_received_vaccine) * 100,
      ) / 10000
  }

  return (
    <>
      <h2>Summary</h2>
      <p>
        {region.percentage_received_vaccine}% of {region.demonym} have received at least one dose of
        the vaccine, which is {getPosition(sortedPosition)} overall for Canada’s{' '}
        {sortedData.length === 3 ? '3 territories' : '10 provinces'}.
      </p>
      <ul>
        {regionAhead && (
          <li>
            {regionAhead.name} is {getPosition(sortedPosition - 1)}, with{' '}
            {regionAhead.percentage_received_vaccine}% of its population vaccinated.
          </li>
        )}
        {regionBehind && (
          <li>
            {regionBehind.name} is {getPosition(sortedPosition + 1)}, with{' '}
            {regionBehind.percentage_received_vaccine}% of its population vaccinated.
          </li>
        )}
      </ul>
      {regionAhead && (
        <p>
          To catch up to {regionAhead.name}, {region.name} would have to give{' '}
          {formatNumberWithCommas(Math.round(region.population * percentDifference))} vaccine doses
          to new people.
        </p>
      )}
    </>
  )
}

RelativePosition.propTypes = {
  data: object.isRequired,
  sortedData: object.isRequired,
  regionsData: object.isRequired,
}

export default RelativePosition
