const fs = require('fs')
const fetch = require('isomorphic-unfetch')

let api = 'https://api.covid19tracker.ca/summary/split'
let filename = '_regions.json'

const _regions = JSON.parse(fs.readFileSync('data/_base.json'))

const getRegions = (data) => {
  let dataArray = data['data'].map((d) => {
    return {
      province: d.province,
      date: d.date,
      total_vaccinations: d.total_vaccinations,
      total_vaccinated: d.total_vaccinated,
      total_received_vaccine: d.total_vaccinations - d.total_vaccinated,
      population: _regions[d.province].population,
      name: _regions[d.province].name,
      demonym: _regions[d.province].demonym,
      abbr: _regions[d.province].abbr,
    }
  })

  const getMapFromArray = (data) =>
    data.reduce((acc, item) => {
      acc[item.abbr] = item
      return acc
    }, {})

  return getMapFromArray(dataArray)
}

const getCanada = (data) => {
  const _sum = (_data, key) => _data.reduce((total, d) => d[key] + total, 0)

  const _getLatestDate = (data) => {
    const item = data.reduce(function (prev, current) {
      return prev.date > current.date ? prev : current
    })

    return item.date
  }

  const total_vaccinations = _sum(data['data'], 'total_vaccinations')
  const total_vaccinated = _sum(data['data'], 'total_vaccinated')
  const total_received_vaccine = total_vaccinations - total_vaccinated

  return {
    CAN: {
      province: 'CAN',
      date: _getLatestDate(data['data']),
      total_vaccinations,
      total_vaccinated,
      total_received_vaccine,
      population: _regions['CAN'].population,
      name: _regions['CAN'].name,
      demonym: _regions['CAN'].demonym,
      abbr: _regions['CAN'].abbr,
    },
  }
}

/* https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key */
const sortByKey = (data) => {
  return Object.keys(data)
    .sort()
    .reduce((obj, key) => {
      obj[key] = data[key]
      return obj
    }, {})
}

fetch(api)
  .then((r) => r.json())
  .then((data) => {
    let out = getRegions(data)
    out = sortByKey(out)
    out = Object.assign(getCanada(data), out)

    fs.writeFileSync(`data/${filename}`, JSON.stringify(out, null, 2))
    console.log(`wrote to data/${filename}`)
  })
