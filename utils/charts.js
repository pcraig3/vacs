import { getDayOfYear } from './data'
import { formatNumberWithCommas, roundToNearestThousand } from './data'

const regions = require('../data/_regions.json')

/*
  Labels
*/
const getDaysLabel = ({ datum }) => `${getDayOfYear()} days (${datum.y}%)`

const getVaccinesLabel = ({ total_received_vaccine }) => {
  return ({ datum }) =>
    `${roundToNearestThousand(total_received_vaccine)} received vaccine (${datum.y}%)`
}

const getFullLabel = ({ total_vaccinated }) => {
  return ({ datum }) => {
    if (!total_vaccinated) return 'No data'

    return `${roundToNearestThousand(total_vaccinated)} fully vaccinated (${datum.y}%)`
  }
}

/*
  Tooltips
*/
const _getVaccinesTooltip = ({ population, total_received_vaccine = 0 }) => {
  return `${formatNumberWithCommas(
    total_received_vaccine,
  )} received vaccine / ${formatNumberWithCommas(population)} people`
}

const getFullTooltip = ({ population, total_vaccinated }) => {
  if (!total_vaccinated) return 'Yep, still no data'

  return `${formatNumberWithCommas(total_vaccinated)} fully vaccinated / ${formatNumberWithCommas(
    population,
  )} people`
}

const getDaysTooltip = () => `${getDayOfYear()} days / 365 days`

const getRegionTooltip = ({ abbr, data }) => {
  if (abbr === 'Days in 2021') return getDaysTooltip()

  data = data || []
  const population = regions[abbr].population
  const {
    total_vaccinations = regions[abbr].total_vaccinations,
    total_vaccinated = regions[abbr].total_vaccinated,
  } = data.length ? data.find((r) => r.province === abbr) : {}

  return _getVaccinesTooltip({
    population,
    total_received_vaccine: total_vaccinations - total_vaccinated,
  })
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
