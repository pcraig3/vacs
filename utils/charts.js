import { getDayOfYear } from './data'
import { formatNumberWithCommas, roundToNearestThousand } from './data'

/*
  Labels
*/
const getDaysLabel = ({ datum }) => `${getDayOfYear()} days (${datum.y}%)`

const getVaccinesLabel = ({ total_received_vaccine }) => {
  return ({ datum }) =>
    `${roundToNearestThousand(total_received_vaccine)} received vaccine (${datum.y}%)`
}

const getFullLabel = ({ total_vaccinated }) => {
  return ({ datum }) => `${roundToNearestThousand(total_vaccinated)} fully vaccinated (${datum.y}%)`
}

/*
  Tooltips
*/
const _getVaccinesTooltip = ({ population, total_received_vaccine }) => {
  return `${formatNumberWithCommas(
    total_received_vaccine,
  )} received vaccine / ${formatNumberWithCommas(population)} people`
}

const getFullTooltip = ({ population, total_vaccinated }) => {
  return `${formatNumberWithCommas(total_vaccinated)} fully vaccinated / ${formatNumberWithCommas(
    population,
  )} people`
}

const getDaysTooltip = () => `${getDayOfYear()} days / 365 days`

const getRegionTooltip = (data) => {
  if (data.abbr === 'Days in 2021') return getDaysTooltip()

  return _getVaccinesTooltip(data)
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
