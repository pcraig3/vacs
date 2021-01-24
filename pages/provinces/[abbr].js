import Link from 'next/link'

import { string } from 'prop-types'

import Layout from '../../components/Layout'
import VacsVaccinesDaysChart from '../../components/charts/VacsVaccinesDaysChart'
import _regions from '../../data/_regions'
import { getDaysData, getFullData, getVaccinesData } from '../../data'

const Province = ({ abbr }) => {
  return (
    <Layout>
      <div>
        <section>
          <h1>
            Province: {abbr}
            {/* <span className="visuallyHidden">Total vaccines administered in </span>Canada */}
          </h1>
          <VacsVaccinesDaysChart
            data={{
              days: getDaysData({ abbr }),
              vaccines: getVaccinesData({ abbr }),
              full: getFullData({ abbr }),
            }}
          >
            <p>
              Comparing the percentage of Canadians who have received vaccines vs the number of days
              passed in 2021
            </p>
            <p className="smalltext">
              (We’re hoping for{' '}
              <Link href="/methodology">
                <a>~70% of Canadians vaccinated by September 13</a>
              </Link>
              .)
            </p>
          </VacsVaccinesDaysChart>

          <h3>
            <span aria-hidden="true">*</span>More info
          </h3>
          <p className="smalltext">
            “Vaccinated” is a little ambiguous. Both vaccines currently used in Canada require 2
            doses (several weeks apart) to be fully effective. However, receiving 1 dose is
            partially effective, and indicates how quickly we are dispensing vaccines.
          </p>
          <p className="smalltext">
            The smaller number tracks how many Canadians have received both doses. The larger number
            tracks how many Canadians have received at least 1 dose. For a more thorough write-up,
            check out the{' '}
            <Link href="/methodology">
              <a>Methodology</a>
            </Link>
            .
          </p>
        </section>
      </div>
    </Layout>
  )
}

Province.propTypes = {
  abbr: string,
}

export async function getStaticPaths() {
  // get all region abbreviations
  const abbrs = Object.keys(_regions)

  // Get the paths we want to pre-render based on region abbrs
  const paths = abbrs.map((abbr) => ({
    params: { abbr },
  }))

  // Pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  return {
    props: { abbr: params.abbr }, // will be passed to the page component as props
  }
}

export default Province
