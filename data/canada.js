import { getPercent, getDayOfYear } from "./index"
import regions from "./_regions"

const canadaDays = [
  {
    x: regions.CAN.abbr,
    y: getPercent({ numerator: getDayOfYear(), denominator: 365 }),
  },
]

const canadaVaccines = [
  {
    x: regions.CAN.abbr,
    y: getPercent({
      numerator: regions.CAN.vaccines,
      denominator: regions.CAN.population,
    }),
  },
]

const _getDataForRegions = (regions) => {
  const regionsMinusCanada = Object.keys(regions).filter(
    (abbr) => abbr !== "CAN"
  )

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
regionVaccines.sort(function (a, b) {
  return b.y - a.y
})

export { canadaDays, canadaVaccines, regionVaccines }
