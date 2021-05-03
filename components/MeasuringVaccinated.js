import Link from 'next/link'
import { string } from 'prop-types'

import { space } from '../styles/_theme'

function MeasuringVaccinated({ demonym = 'Canadians' }) {
  return (
    <>
      <h3 id="measuring-vaccinated">
        <span aria-hidden="true">*</span>Measuring “vaccinated”
        <style jsx>{`
          margin-top: ${space.lg};
        `}</style>
      </h3>
      <div className="smalltext">
        <p>
          “Vaccinated” is a little ambiguous. Both vaccines currently used in Canada require 2 doses
          (several weeks apart) to be fully effective. However, receiving 1 dose is partially
          effective, and indicates how quickly we are dispensing vaccines.
        </p>
        <ul>
          <li>The larger number tracks {demonym} who have received at least 1 dose.</li>
          <li>The smaller number tracks {demonym} who have received both doses.</li>
        </ul>
        <p>
          For a more thorough write-up, check out the{' '}
          <Link href="/methodology">
            <a>Methodology</a>
          </Link>
          .
        </p>
      </div>
    </>
  )
}

MeasuringVaccinated.propTypes = {
  demonym: string,
}

export default MeasuringVaccinated
