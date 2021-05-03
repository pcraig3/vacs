import { getDayOfYear } from '../data'
import {
  getDaysLabel,
  getVaccinesLabel,
  getFullLabel,
  getDaysTooltip,
  _getVaccinesTooltip,
  getFullTooltip,
} from '../charts'

describe('test getDaysLabel', () => {
  test('returns current days of year and a y value', () => {
    expect(getDaysLabel({ datum: { y: '10' } })).toEqual(`${getDayOfYear()} days (10%)`)
  })
})

describe('test getVaccinesLabel', () => {
  test('returns current vaccines for Canada and a y value', () => {
    expect(
      getVaccinesLabel({ total_received_vaccine: 123456 })({ datum: { x: 'CAN', y: '10' } }),
    ).toEqual('123k vaccinated (10%)')
  })
})

describe('test getFullLabel', () => {
  test('returns current fully-vaccinated number for Canada and a y value', () => {
    expect(getFullLabel({ total_vaccinated: 123456 })({ datum: { x: 'CAN', y: '10' } })).toEqual(
      '123k fully vaccinated (10%)',
    )
  })

  const zeros = [0, null, undefined]
  zeros.map((zero) => {
    test(`returns "No data" if a ${zero} fully-vaccinated number for Canada and a y value`, () => {
      expect(getFullLabel({ total_vaccinated: zero })({ datum: { x: 'CAN', y: '10' } })).toEqual(
        'No data',
      )
    })
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
      '1,234 vaccinated / 100,000 people',
    )
  })
})

describe('test getFullTooltip', () => {
  test('returns total vaccinated number for Canada', () => {
    expect(getFullTooltip({ population: 100000, total_vaccinated: 1234 })).toEqual(
      '1,234 fully vaccinated / 100,000 people',
    )
  })

  const zeros = [0, null, undefined]
  zeros.map((zero) => {
    test(`returns "Yep, still no data" if a ${zero} fully-vaccinated number for Canada and a y value`, () => {
      expect(getFullTooltip({ population: 100000, total_vaccinated: zero })).toEqual(
        'Yep, still no data',
      )
    })
  })
})
