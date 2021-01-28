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
    // TODO: Last updated is something we can check in provinces
    const lastUpdateISO = new Date(data.last_updated + ' CST')
    const lastUpdatedDate = data.last_updated.substring(0, 10)

    fs.writeFileSync(
      'data/_lastUpdated.json',
      JSON.stringify({ last_updated: lastUpdateISO }, null, 2),
    )
    console.log('wrote to data/_lastUpdated.json')

    let out = getRegions(data)
    out = sortByKey(out)
    out = Object.assign(getCanada(data), out)

    // add more specific date if "date" key looks like the same day as last_updated
    Object.keys(out).forEach((key) => {
      if (out[key]['date'] === lastUpdatedDate) {
        out[key]['date'] = lastUpdateISO
      }
    })

    fs.writeFileSync(`data/${filename}`, JSON.stringify(out, null, 2))
    console.log(`wrote to data/${filename}`)
  })
