import { getDayOfYear } from '../data'
import { formatNumberWithCommas, roundToNearestThousand } from '../data'
import regions from '../data/_regions'

/*
  Labels
*/
const getDaysLabel = ({ datum }) => `${getDayOfYear()} days (${datum.y}%)`

const getVaccinesLabel = ({ datum }) =>
  `${roundToNearestThousand(regions[datum.x].vaccines)} partly/fully vaccinated (${datum.y}%)`

const getFullLabel = ({ datum }) =>
  `${roundToNearestThousand(regions[datum.x].full)} fully vaccinated (${datum.y}%)`

/*
  Tooltips
*/
const _getVaccinesTooltip = (abbr) => {
  return `${formatNumberWithCommas(
    regions[abbr].vaccines,
  )} received vaccine / ${formatNumberWithCommas(regions[abbr].population)} people`
}

const getFullTooltip = (abbr) => {
  return `${formatNumberWithCommas(regions[abbr].full)} fully vaccinated / ${formatNumberWithCommas(
    regions[abbr].population,
  )} people`
}

const getDaysTooltip = () => `${getDayOfYear()} days / 365 days`

const getRegionTooltip = (abbr) => {
  if (abbr === 'Days in 2021') return getDaysTooltip()

  return _getVaccinesTooltip(abbr)
}

export {
  getDaysLabel,
  getFullLabel,
  getVaccinesLabel,
  getDaysTooltip,
  getFullTooltip,
  _getVaccinesTooltip,
  getRegionTooltip,
}
