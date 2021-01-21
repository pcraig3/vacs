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
import { canadaDays, canadaVaccines, regionVaccines } from '../data/canada'
import {
  _getDaysLabel,
  _getVaccinesLabel,
  _getDaysTooltip,
  getRegionTooltip,
} from '../utils/charts'

const LastUpdated = () => <p>Last updated: Wednesday, Jan 20 at 6:33 pm EST.</p>

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
        <p>Number of administered vaccines as a percentage of Canada’s population.</p>
        <div className="chart">
          <VictoryChart height={140} width={360} theme={theme}>
            <VictoryLegend
              colorScale={[colors.QcOrangeAccent, colors.QcBlueLight]}
              data={[{ name: 'Vaccinations administered' }, { name: 'Days in 2021' }]}
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
                labels={_getDaysLabel}
                labelComponent={<VacsLabel tooltipLabel={() => _getDaysTooltip()} />}
              />
              <VictoryBar
                animate={_animateBar}
                name="bar-vaccines"
                data={canadaVaccines}
                labels={_getVaccinesLabel}
                labelComponent={
                  <VacsLabel tooltipLabel={(label) => getRegionTooltip(label.datum.x)} />
                }
              />
            </VictoryGroup>
            <VacsRedLine />
          </VictoryChart>
        </div>

        <LastUpdated />

        <h3>More info</h3>
        <p className="smalltext">
          This is currently a very rough metric. “Vaccinated Canadians” is different than “vaccines
          administered”. Check out{' '}
          <Link href="/methodologies">
            <a>methodologies</a>
          </Link>{' '}
          for more of a discussion.
        </p>
      </section>

      <section>
        <h2>
          <span className="visuallyHidden">Total vaccines administered in Canada </span>By region
        </h2>
        <p>
          Number of administered vaccines as a percentage of each of Canada’s provinces and
          territories.
        </p>

        <div className="chart">
          <VictoryChart height={400} width={360} domainPadding={8} theme={theme}>
            <VictoryLegend
              colorScale={[colors.QcOrangeAccent, colors.QcBlueLight]}
              data={[{ name: 'Vaccinations administered' }, { name: 'Days in 2021' }]}
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

        <h3>More info</h3>
        <p className="smalltext">
          Some regions have started to administer second doses, while others have not. This graph
          will change over the next several days as more granular data is released.
        </p>
      </section>

      <style jsx>{`
        .chart + p {
          margin-top: -30px;
        }
      `}</style>
    </div>
  </Layout>
)

export default Home
