import { getPercent, getDayOfYear } from '../utils/data'

const regions = require('./_regions.json')

const getDaysData = ({ abbr = 'CAN' }) => [
  {
    x: abbr,
    y: getPercent({ numerator: getDayOfYear(), denominator: 365 }),
  },
]

const mergeData = ({ abbr = 'CAN', data }) => {
  const regions = require('./_regions.json')

  if (data) {
    let {
      total_vaccinated = regions[abbr].total_vaccinated,
      total_vaccinations = regions[abbr].total_vaccinations,
    } = data

    Object.assign(regions[abbr], {
      total_vaccinated,
      total_vaccinations,
      total_received_vaccine: total_vaccinations - total_vaccinated,
    })
  }

  return regions[abbr]
}

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

const _getDataForRegions = (regions) => {
  const regionsMinusCanada = Object.keys(regions).filter((abbr) => abbr !== 'CAN')

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

const regionVaccines = _getDataForRegions(regions)

regionVaccines.push({
  x: 'Days in 2021',
  y: getPercent({ numerator: getDayOfYear(), denominator: 365 }),
  fill: '#b9cde0',
})

regionVaccines.sort(function (a, b) {
  return b.y - a.y
})

export { getDaysData, getFullData, getVaccinesData, regionVaccines, mergeData }
