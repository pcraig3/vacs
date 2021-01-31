import { getDayOfYear } from '../data'
import { getDaysLabel, getVaccinesLabel, getDaysTooltip, _getVaccinesTooltip } from '../charts'

describe('test getDaysLabel', () => {
  test('returns current days of year and a y value', () => {
    expect(getDaysLabel({ datum: { y: '10' } })).toEqual(`${getDayOfYear()} days (10%)`)
  })
})

describe('test getVaccinesLabel', () => {
  test('returns current vaccines for Canada and a y value', () => {
    expect(
      getVaccinesLabel({ total_received_vaccine: 123456 })({ datum: { x: 'CAN', y: '10' } }),
    ).toEqual(`123k received vaccine (10%)`)
  })
})

describe('test getDaysTooltip', () => {
  test('returns current days of year', () => {
    expect(getDaysTooltip()).toEqual(`${getDayOfYear()} days / 365 days`)
  })
})

describe('test _getVaccinesTooltip', () => {
  test('returns vaccines for Canada', () => {
    expect(_getVaccinesTooltip({ population: 100000, total_received_vaccine: 1234 })).toEqual(
      '1,234 received vaccine / 100,000 people',
    )
  })
})
