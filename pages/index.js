import Link from 'next/link'

import { number } from 'prop-types'

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
} from 'victory'

import Layout from '../components/Layout'
import VacsLabel from '../components/VacsLabel'

import { colors, theme } from '../styles/_theme'
import { canadaDays, canadaVaccines, canadaFull, regionVaccines } from '../data/canada'
import {
  getDaysLabel,
  getFullLabel,
  getVaccinesLabel,
  getDaysTooltip,
  getFullTooltip,
  getRegionTooltip,
} from '../utils/charts'

const LastUpdated = () => (
  <p>
    Last updated: Wednesday, Jan 20 at 6:33 pm EST.
    <style jsx>{`
      margin-top: -40px;
      margin-bottom: 40px;
      z-index: 1;
    `}</style>
  </p>
)

const VacsRedLine = ({ labelY = 80, ...props }) => (
  <VictoryLine
    {...props}
    style={{
      data: {
        stroke: colors.CanadaRed,
        strokeWidth: 0.5,
        strokeDasharray: '4, 4',
      },
      labels: { angle: 0, fill: colors.CanadaRed, fontSize: 8, padding: 5 },
    }}
    labels={['September 13']}
    labelComponent={<VictoryLabel y={labelY} />}
    y={() => 70}
  />
)

VacsRedLine.propTypes = {
  labelY: number,
}

const _animateBar = { duration: 1500, onLoad: { duration: 500 } }

const Home = () => (
  <Layout>
    <div>
      <section>
        <h1>
          <span className="visuallyHidden">Total vaccines administered in </span>Canada
        </h1>
        <p>Percentage of Canadians who have received vaccines</p>
        <div className="chart">
          <VictoryChart height={154} width={360} theme={theme}>
            <VictoryLegend
              colorScale={[colors.QcOrangeAccent, colors.QcBlueLight]}
              data={[{ name: 'Canadians vaccinated*' }, { name: 'Days in 2021' }]}
            />
            <VictoryAxis />
            <VictoryAxis
              dependentAxis
              domain={[0, 100]}
              tickValues={[canadaDays[0].y, 50, 70, 100]}
              tickFormat={(t) => `${t}%`}
              orientation="bottom"
            />
            <VictoryGroup
              horizontal
              offset={18}
              style={{
                data: { width: 10 },
              }}
              colorScale={[colors.QcBlueLight, colors.QcOrangeAccent]}
            >
              <VictoryBar
                name="bar-days"
                animate={_animateBar}
                data={canadaDays}
                labels={getDaysLabel}
                labelComponent={<VacsLabel tooltipLabel={() => getDaysTooltip()} />}
              />
              <VictoryBar
                animate={_animateBar}
                name="bar-vaccines"
                data={canadaVaccines}
                labels={getVaccinesLabel}
                labelComponent={
                  <VacsLabel tooltipLabel={(label) => getRegionTooltip(label.datum.x)} />
                }
              />
              <VictoryBar
                animate={_animateBar}
                name="bar-two"
                data={canadaFull}
                labels={getFullLabel}
                labelComponent={
                  <VacsLabel tooltipLabel={(label) => getFullTooltip(label.datum.x)} />
                }
              />
            </VictoryGroup>
            <VacsRedLine />
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
              tickValues={[canadaDays[0].y, 50, 70, 100]}
              tickFormat={(t) => `${t}%`}
              orientation="bottom"
            />
            <VictoryBar
              animate={_animateBar}
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
