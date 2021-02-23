/**
 * Adds commas to large numbers. 111222333 -> 111,222,333
 * @param {number} number a number to return formatted with commas
 */
const formatNumberWithCommas = (number) => {
  if (number) return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return 0
}

/**
 * Returns the day of the year. Jan 3rd -> 3. Feb 3rd -> 34
 * https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
 */
const getDayOfYear = () => {
  var now = new Date()
  var start = new Date(now.getFullYear(), 0, 0)
  var diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000
  var oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

// round to one digit
const getPercent = ({ numerator, denominator }) => {
  const percentage = (numerator / denominator) * 100
  return Math.round((percentage + Number.EPSILON) * 10) / 10
}

/**
 * Returns numbers rounded to the nearest thousand and prepended by "k"
 * 111600 -> 112k
 * Unless, it's over 1 million, then it will return the number of millions to 2 decimal places
 * 1116000 -> 1.12 m
 * @param {number} number
 */
const roundToNearestThousand = (number) => {
  if (number > 1000000) {
    const ten_thousands = Math.round(number / 10000)
    return `${ten_thousands / 100} m`
  }
  return `${Math.round(number / 1000)}k`
}

const sortByKey = ({ data, key, sortBy = 'descending' }) => {
  return data.sort(function (a, b) {
    return sortBy === 'ascending' ? a[key] - b[key] : b[key] - a[key]
  })
}

export { formatNumberWithCommas, getDayOfYear, getPercent, roundToNearestThousand, sortByKey }
