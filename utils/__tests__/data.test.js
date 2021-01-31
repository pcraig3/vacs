import { getPercent, formatNumberWithCommas, roundToNearestThousand } from '../data'

const valsPercent = [
  { in: [1000, 2000], out: 50 },
  { in: [200, 2000], out: 10 },
  { in: [20, 2000], out: 1 },
  { in: [2, 2000], out: 0.1 },
  { in: [1, 2000], out: 0.1 },
  { in: [0.5, 2000], out: 0 },
]

describe('for getPercent', () => {
  valsPercent.map((v) => {
    test(`returns "${v.out}" for "${v.in}"`, () => {
      expect(getPercent({ numerator: v.in[0], denominator: v.in[1] })).toBe(v.out)
    })
  })
})

const valsCommas = [
  { in: 1000, out: '1,000' },
  { in: 123456, out: '123,456' },
  { in: 500, out: '500' },
  { in: 0, out: 0 },
  { in: 'string', out: 'string' },
  { in: '1000', out: '1,000' },
]

describe('for formatNumberWithCommas', () => {
  valsCommas.map((v) => {
    test(`returns "${v.out}" for "${v.in}"`, () => {
      expect(formatNumberWithCommas(v.in)).toBe(v.out)
    })
  })
})

const valsThousand = [
  { in: 1000, out: '1k' },
  { in: 123456, out: '123k' },
  { in: 500, out: '1k' },
  { in: 499, out: '0k' },
  { in: 0, out: '0k' },
  { in: null, out: '0k' },
  { in: 'string', out: 'NaNk' },
  { in: '1000', out: '1k' },
]

describe('for roundToNearestThousand', () => {
  valsThousand.map((v) => {
    test(`returns "${v.out}" for "${v.in}"`, () => {
      expect(roundToNearestThousand(v.in)).toBe(v.out)
    })
  })
})
