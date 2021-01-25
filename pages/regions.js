import Link from 'next/link'

import Layout from '../components/Layout'
import _regions from '../data/_regions'

const _territories = ['NT', 'NU', 'YT']

const getProvinces = (regions) => {
  // return all provinces in canada
  return Object.keys(regions).filter((r) => r !== 'CAN' && !_territories.includes(r))
}

const getTerritories = (regions) => {
  // return all territories in canada
  return Object.keys(regions).filter((r) => _territories.includes(r))
}

export default function Regions() {
  return (
    <Layout title="All regions">
      <section>
        <h1>All regions</h1>
        <p>
          <Link href="/">
            <a>All of Canada</a>
          </Link>
        </p>
        <br />
        <h2>Provinces</h2>
        <ul>
          {getProvinces(_regions).map((abbr) => {
            return (
              <li key={abbr}>
                <Link href={`/regions/${abbr}`}>
                  <a>{_regions[abbr].name}</a>
                </Link>
              </li>
            )
          })}
        </ul>
        <br />
        <h2>Territories</h2>
        <ul>
          {getTerritories(_regions).map((abbr) => {
            return (
              <li key={abbr}>
                <Link href={`/regions/${abbr}`}>
                  <a>{_regions[abbr].name}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
      <style jsx>{`
        h1 + p {
          margin-bottom: 0;
        }

        h2 {
          margin-top: 2rem;
        }

        ul {
          columns: 2 20rem;
          list-style: none;
        }
      `}</style>
    </Layout>
  )
}
