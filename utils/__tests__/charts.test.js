import { getDayOfYear, formatNumberWithCommas, roundToNearestThousand } from '../../data'
import regions from '../../data/_regions'
import { _getDaysLabel, _getVaccinesLabel, _getDaysTooltip, _getVaccinesTooltip } from '../charts'

describe('test _getDaysLabel', () => {
  test('returns current days of year and a y value', () => {
    expect(_getDaysLabel({ datum: { y: '10' } })).toEqual(`${getDayOfYear()} days (10%)`)
  })
})

describe('test _getVaccinesLabel', () => {
  test('returns current vaccines for Canada and a y value', () => {
    expect(_getVaccinesLabel({ datum: { x: 'CAN', y: '10' } })).toEqual(
      `${roundToNearestThousand(regions['CAN'].vaccines)} vaccines (10%)`,
    )
  })
})

describe('test _getDaysTooltip', () => {
  test('returns current days of year', () => {
    expect(_getDaysTooltip()).toEqual(`${getDayOfYear()} days / 365 days`)
  })
})

describe('test _getDaysTooltip', () => {
  test('returns vaccines for Canada', () => {
    expect(_getVaccinesTooltip('CAN')).toEqual(
      `${formatNumberWithCommas(regions['CAN'].vaccines)} vaccines used / ${formatNumberWithCommas(
        regions['CAN'].population,
      )} people`,
    )
  })
})

describe('test getRegionTooltip', () => {
  test('returns days tooltip func', () => {
    expect(_getVaccinesTooltip('CAN')).toEqual(
      `${formatNumberWithCommas(regions['CAN'].vaccines)} vaccines used / ${formatNumberWithCommas(
        regions['CAN'].population,
      )} people`,
    )
  })
})
