import { getDayOfYear, formatNumberWithCommas, roundToNearestThousand } from '../data'
import regions from '../../data/_regions'
import { getDaysLabel, getVaccinesLabel, getDaysTooltip, _getVaccinesTooltip } from '../charts'

describe('test _getDaysLabel', () => {
  test('returns current days of year and a y value', () => {
    expect(getDaysLabel({ datum: { y: '10' } })).toEqual(`${getDayOfYear()} days (10%)`)
  })
})

describe('test _getVaccinesLabel', () => {
  test('returns current vaccines for Canada and a y value', () => {
    expect(getVaccinesLabel({ datum: { x: 'CAN', y: '10' } })).toEqual(
      `${roundToNearestThousand(regions['CAN'].vaccines)} received vaccine (10%)`,
    )
  })
})

describe('test _getDaysTooltip', () => {
  test('returns current days of year', () => {
    expect(getDaysTooltip()).toEqual(`${getDayOfYear()} days / 365 days`)
  })
})

describe('test _getDaysTooltip', () => {
  test('returns vaccines for Canada', () => {
    expect(_getVaccinesTooltip('CAN')).toEqual(
      `${formatNumberWithCommas(
        regions['CAN'].vaccines,
      )} received vaccine / ${formatNumberWithCommas(regions['CAN'].population)} people`,
    )
  })
})

describe('test getRegionTooltip', () => {
  test('returns days tooltip func', () => {
    expect(_getVaccinesTooltip('CAN')).toEqual(
      `${formatNumberWithCommas(
        regions['CAN'].vaccines,
      )} received vaccine / ${formatNumberWithCommas(regions['CAN'].population)} people`,
    )
  })
})
