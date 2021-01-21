import { getDayOfYear } from '../data'
import { formatNumberWithCommas, roundToNearestThousand } from '../data'
import regions from '../data/_regions'

/*
  Labels
*/
const _getDaysLabel = ({ datum }) => `${getDayOfYear()} days (${datum.y}%)`

const _getVaccinesLabel = ({ datum }) =>
  `${roundToNearestThousand(regions[datum.x].vaccines)} vaccines (${datum.y}%)`

/*
  Tooltips
*/
const _getVaccinesTooltip = (abbr) => {
  return `${formatNumberWithCommas(
    regions[abbr].vaccines,
  )} vaccines used / ${formatNumberWithCommas(regions[abbr].population)} people`
}

const _getDaysTooltip = () => `${getDayOfYear()} days / 365 days`

const getRegionTooltip = (abbr) => {
  if (abbr === 'Days in 2021') return _getDaysTooltip()

  return _getVaccinesTooltip(abbr)
}

export { _getDaysLabel, _getVaccinesLabel, _getDaysTooltip, _getVaccinesTooltip, getRegionTooltip }
