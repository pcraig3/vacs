import { getPercent, getDayOfYear } from '../utils/data'
import regions from './_regions'

const getDaysData = ({ abbr = 'CAN' }) => [
  {
    x: regions[abbr].abbr,
    y: getPercent({ numerator: getDayOfYear(), denominator: 365 }),
  },
]

const getVaccinesData = ({ abbr = 'CAN' }) => [
  {
    x: regions[abbr].abbr,
    y: getPercent({
      numerator: regions[abbr].vaccines,
      denominator: regions[abbr].population,
    }),
  },
]

const getFullData = ({ abbr = 'CAN' }) => [
  {
    x: regions[abbr].abbr,
    y: getPercent({
      numerator: regions[abbr].full,
      denominator: regions[abbr].population,
    }),
  },
]

const _getDataForRegions = (regions) => {
  const regionsMinusCanada = Object.keys(regions).filter((abbr) => abbr !== 'CAN')

  return regionsMinusCanada.map((abbr) => {
    return {
      x: abbr,
      y: getPercent({
        numerator: regions[abbr].vaccines,
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

export { getDaysData, getFullData, getVaccinesData, regionVaccines }
