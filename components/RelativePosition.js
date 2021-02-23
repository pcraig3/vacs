import { object, string } from 'prop-types'

const _territories = ['NT', 'NU', 'YT']

import { mergeData } from '../data'
import { formatNumberWithCommas, sortByKey } from '../utils/data'

const isProvince = (abbr) => {
  return abbr ? !_territories.includes(abbr) : false
}

const readPosition = (position) => {
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

function RelativePosition({ abbr, regionsData }) {
  regionsData = regionsData.map((region) =>
    mergeData({
      abbr: region.province,
      data: region,
    }),
  )

  let percentDifference

  regionsData = isProvince(abbr)
    ? regionsData.filter((r) => !_territories.includes(r.abbr))
    : regionsData.filter((r) => _territories.includes(r.abbr))

  sortByKey({ data: regionsData, key: 'percentage_received_vaccine' })

  const sortedPosition = regionsData.findIndex((r) => r.abbr === abbr)

  const regionAhead = sortedPosition > 0 ? regionsData[sortedPosition - 1] : false
  const regionBehind =
    sortedPosition !== regionsData.length - 1 ? regionsData[sortedPosition + 1] : false

  const region = regionsData[sortedPosition]

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
        the vaccine, which is {readPosition(sortedPosition)} overall for Canada’s{' '}
        {regionsData.length === 3 ? '3 territories' : '10 provinces'}.
      </p>
      <ul>
        {regionAhead && (
          <li>
            {regionAhead.name} is {readPosition(sortedPosition - 1)}, with{' '}
            {regionAhead.percentage_received_vaccine}% of its population vaccinated.
          </li>
        )}
        {regionBehind && (
          <li>
            {regionBehind.name} is {readPosition(sortedPosition + 1)}, with{' '}
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
  abbr: string.isRequired,
  regionsData: object.isRequired,
}

export default RelativePosition
