import Link from 'next/link'

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLegend } from 'victory'

import Layout from '../components/Layout'
import VacsLabel from '../components/charts/VacsLabel'
import VacsVaccinesDaysChart from '../components/charts/VacsVaccinesDaysChart'
import VacsRedLine from '../components/charts/VacsRedLine'

import { animateBar, colors, theme } from '../styles/_theme'
import { getDaysData, getFullData, getVaccinesData, regionVaccines } from '../data'
import { getRegionTooltip } from '../utils/charts'

const LastUpdated = () => (
  <p>
    Last updated: Saturday, Jan 23 at 1:31 pm EST.
    <style jsx>{`
      margin-top: -40px;
      margin-bottom: 40px;
      z-index: 1;
    `}</style>
  </p>
)

const abbr = 'CAN'

const Home = () => (
  <Layout>
    <div>
      <section>
        <h1>
          <span className="visuallyHidden">Total vaccines administered in </span>Canada
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
        <LastUpdated />

        <h3>
          <span aria-hidden="true">*</span>More info
        </h3>
        <p className="smalltext">
          “Vaccinated” is a little ambiguous. Both vaccines currently used in Canada require 2 doses
          (several weeks apart) to be fully effective. However, receiving 1 dose is partially
          effective, and indicates how quickly we are dispensing vaccines.
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

      <section>
        <h2>
          <span className="visuallyHidden">Total vaccines administered in Canada </span>By region
        </h2>
        <p>
          Percentage of Canadians who have received vaccines across all provinces and territories.
        </p>

        <div className="chart">
          <VictoryChart height={400} width={360} domainPadding={8} theme={theme}>
            <VictoryLegend
              colorScale={[colors.QcOrangeAccent, colors.QcBlueLight]}
              data={[{ name: 'Canadians vaccinated*' }, { name: 'Days in 2021' }]}
            />
            <VictoryAxis
              fixLabelOverlap={true}
              style={{
                ticks: { size: 3 },
                tickLabels: { fontSize: 7.5, padding: 2 },
              }}
            />
            <VictoryAxis
              dependentAxis
              domain={[0, 100]}
              tickValues={[getDaysData(abbr)[0].y, 50, 70, 100]}
              tickFormat={(t) => `${t}%`}
              orientation="bottom"
            />
            <VictoryBar
              animate={animateBar}
              horizontal
              name="bar-vaccines"
              data={regionVaccines}
              labels={({ datum }) => `${datum.y}%`}
              style={{
                data: {
                  fill: ({ datum }) => datum.fill || colors.QcOrangeAccent,
                },
              }}
              labelComponent={
                <VacsLabel tooltipLabel={(label) => getRegionTooltip(label.datum.x)} />
              }
            />
            <VacsRedLine labelY={342} />
          </VictoryChart>
        </div>

        <LastUpdated />

        <h3>
          <span aria-hidden="true">*</span>More info
        </h3>
        <p className="smalltext">
          “Vaccinated” is a little ambiguous. Both vaccines currently used in Canada require 2 doses
          (several weeks apart) to be fully effective. However, receiving 1 dose is partially
          effective, and indicates how quickly we are dispensing vaccines.
        </p>
        <p className="smalltext">
          The percentages above track how many Canadians from each region have received at least 1
          dose.
        </p>
      </section>
    </div>
  </Layout>
)

export default Home
