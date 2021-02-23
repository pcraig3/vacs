import { getPercent, getDayOfYear, sortByKey } from '../utils/data'

const mergeData = ({ abbr = 'CAN', data }) => {
  const regions = require('./_regions.json')

  if (data) {
    if (Array.isArray(data)) {
      data = data.find((region) => region.province === abbr)
    }

    let {
      total_vaccinated = regions[abbr].total_vaccinated,
      total_vaccinations = regions[abbr].total_vaccinations,
    } = data

    Object.assign(regions[abbr], {
      total_vaccinated: parseInt(total_vaccinated || 0, 10),
      total_vaccinations: parseInt(total_vaccinations || 0, 10),
      total_received_vaccine: total_vaccinations - total_vaccinated,
      percentage_received_vaccine: getPercent({
        numerator: total_vaccinations - total_vaccinated,
        denominator: regions[abbr].population,
      }),
      percentage_vaccinated: getPercent({
        numerator: parseInt(total_vaccinated || 0, 10),
        denominator: regions[abbr].population,
      }),
    })
  }

  return regions[abbr]
}

const getDaysData = ({ abbr = 'CAN' }) => [
  {
    x: abbr,
    y: getPercent({ numerator: getDayOfYear(), denominator: 365 }),
  },
]

const getVaccinesData = ({ abbr = 'CAN', data }) => {
  return [
    {
      x: abbr,
      y: getPercent({
        numerator: data.total_received_vaccine,
        denominator: data.population,
      }),
    },
  ]
}

const getFullData = ({ abbr = 'CAN', data }) => {
  return [
    {
      x: abbr,
      y: getPercent({
        numerator: data.total_vaccinated,
        denominator: data.population,
      }),
    },
  ]
}

const _getDataForRegions = ({ data: apiRegions = [] }) => {
  const regions = require('./_regions.json')
  const regionsMinusCanada = Object.keys(regions).filter((abbr) => abbr !== 'CAN')

  apiRegions.map((r) => {
    let { province: abbr, total_vaccinations, total_vaccinated } = r
    regions[abbr]['total_received_vaccine'] = total_vaccinations - total_vaccinated
  })

  return regionsMinusCanada.map((abbr) => {
    return {
      x: abbr,
      y: getPercent({
        numerator: regions[abbr].total_received_vaccine,
        denominator: regions[abbr].population,
      }),
    }
  })
}

const getRegionVaccines = ({ data, withDays = true, sortBy = 'descending' }) => {
  let regionsData = _getDataForRegions({ data })

  if (withDays) {
    regionsData.push({
      x: 'Days in 2021',
      y: getPercent({ numerator: getDayOfYear(), denominator: 365 }),
      fill: '#b9cde0',
    })
  }

  return sortByKey({ data: regionsData, key: 'y', sortBy })
}

export { getDaysData, getFullData, getVaccinesData, getRegionVaccines, mergeData }
