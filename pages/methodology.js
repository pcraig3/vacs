import Layout from '../components/Layout'
import Link from 'next/link'

export default function About() {
  return (
    <Layout title="Methodology">
      <section>
        <h1>Methodology</h1>
        <p>
          Justin Trudeau announced that “
          <Link href="https://www.thestar.com/politics/federal/2021/01/12/justin-trudeau-says-that-canada-will-have-enough-covid-19-vaccines-for-everyone-by-the-end-of-september.html">
            <a target="blank">every Canadian who wants a vaccine [will] receive one by September</a>
          </Link>
          .”
        </p>
        <p>
          The <abbr title="World Health Organization">WHO</abbr> has also estimated that a “
          <Link href="https://www.reuters.com/article/us-health-coronavirus-immunity-analysis-idUSKBN27Y124">
            <a target="blank">
              65-70% vaccine coverage rate [is] a way to reach population immunity
            </a>
          </Link>
          .”
        </p>
        <p>
          September 13 is 70% of the way through a year, which lines up pretty well with when
          Trudeau said that vaccines should be generally available. It seems to me that we would be
          in really good shape if 70% of Canadians were vaccinated by mid-September.
        </p>
        <h2>People vs doses</h2>
        <p>
          “Canadians who have received the vaccine” is a lower number than “Vaccine doses
          administered.” It is more useful to track how many <em>people</em> have received at least
          one vaccine than to just track the total number of spent vaccines.
        </p>
        <p>
          Both the Pfizer and Moderna vaccines require 2 doses, but you have to wait a few weeks
          before getting the second one. Initally, many more people will have just 1 dose, but, over
          time, the number of people with 2 doses will catch up.
        </p>
        <h2>How effective is 1 dose?</h2>
        <p>Somewhat effective, but it’s still unclear.</p>
        <p>To take the Pfizer vaccine as an example:</p>
        <ul>
          <li>
            both doses together are{' '}
            <Link href="https://www.bmj.com/content/371/bmj.m4826">
              <a target="blank">~95%</a>
            </Link>{' '}
            effective
          </li>
          <li>
            1 dose is estimated to be
            <Link href="https://www.bmj.com/content/371/bmj.m4826">
              <a target="blank">~52%</a>
            </Link>{' '}
            or{' '}
            <Link href="https://www.theguardian.com/world/2021/jan/19/single-covid-vaccine-dose-in-israel-less-effective-than-we-hoped">
              <a target="blank">~33%</a>
            </Link>{' '}
            effective
          </li>
        </ul>
        <h2>Where does that leave us?</h2>
        <p>There are always unknowns, but the data we have is nevertheless useful.</p>
        <p>
          <span className="manicule" aria-hidden="true">
            ☞
          </span>
          The number of fully-vaccinated people is the most important number: the restrictions will
          end once it is high enough.
        </p>
        <p>
          <span className="manicule" aria-hidden="true">
            ☞
          </span>
          The number of people who have received a vaccine is important too: it tells us how quickly
          vaccines are being administered.
        </p>
        <p>
          <span className="manicule" aria-hidden="true">
            ☞
          </span>
          Watching the progress of vaccine distribution vs the number of days in the year helps us
          estimate how likely it is that I will be able to do a summer road trip to the Gaspésie.
        </p>

        <style jsx>{`
          ul + h2 {
            margin-top: 20px;
          }
          .manicule {
            margin-right: 10px;
          }
        `}</style>
      </section>
    </Layout>
  )
}
