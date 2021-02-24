import Link from 'next/link'

import Layout from '../components/Layout'

export default function Methodology() {
  return (
    <Layout title="Methodology">
      <section>
        <h1>Methodology</h1>
        <p>
          “The federal government has released an updated COVID-19 vaccination timeline, showing
          that at least 14.5 million Canadians will be able to be immunized by the end of June,”{' '}
          <Link href="https://www.ctvnews.ca/health/coronavirus/14-5m-canadians-to-be-immunized-by-june-updated-vaccination-timeline-shows-1.5314048">
            <a target="blank">according to CTV News</a>
          </Link>
          . “The timeline [also] shows that up to 24.5 million Canadians <em>could be</em> fully
          vaccinated by the end of June,” they continue (emphasis mine).
        </p>
        <ul>
          <li>19 million is halfway between those estimates, which is ~50% of the population</li>
          <li>Canada Day — July 1st — is 50% of the way through the year</li>
        </ul>
        <p>
          Basically, we want to be approaching about 50% of the population vaccinated by Canada Day.
          If we miss the mark, we still want to be around 40% by July 1st.
        </p>
        <p>
          The <abbr title="World Health Organization">WHO</abbr> has estimated that a “
          <Link href="https://www.reuters.com/article/us-health-coronavirus-immunity-analysis-idUSKBN27Y124">
            <a target="blank">
              65-70% vaccine coverage rate [is] a way to reach population immunity
            </a>
          </Link>
          ,” so if we’re at 50% by Canada Day, we’re in good shape to be close to 70% by Labour Day.
        </p>
        <p>
          The idea here is to provide an easy-to-read progress indicator as we continue to ramp up
          vaccine distribution in Canada.
        </p>

        <h2>People vs doses</h2>
        <p>
          “Canadians who have received the vaccine” is a lower number than “Vaccine doses
          administered.” It’s more useful to track how many <em>people</em> have received at least
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
