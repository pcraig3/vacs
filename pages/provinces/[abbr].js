import Link from 'next/link'

import { string } from 'prop-types'

import Layout from '../../components/Layout'
import _regions from '../../data/_regions'

const Province = ({ abbr }) => {
  return (
    <Layout>
      <div>
        <section>
          <h1>
            Province: {abbr}
            {/* <span className="visuallyHidden">Total vaccines administered in </span>Canada */}
          </h1>

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

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const abbrs = Object.keys(_regions)

  // Get the paths we want to pre-render based on posts
  const paths = abbrs.map((abbr) => ({
    params: { abbr },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  console.log(params)
  if (!params.abbr) params['abbr'] = 'AB'

  /*
  if (!data) {
    return {
      notFound: true,
    }
  }
  */

  return {
    props: { abbr: params.abbr }, // will be passed to the page component as props
  }
}

export default Province
