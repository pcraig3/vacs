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
import CustomLabel from '../components/CustomLabel'

import { colors, theme } from '../styles/_theme'
import { canadaDays, canadaVaccines, regionVaccines } from '../data/canada'
import { formatNumberWithCommas, getDayOfYear } from '../data'
import regions from '../data/_regions'

const _getVaccinatedTooltip = (abbr) => {
  return `${formatNumberWithCommas(
    regions[abbr].vaccines,
  )} vaccines used / ${formatNumberWithCommas(regions[abbr].population)} people`
}

const _getDaysTooltip = () => `${getDayOfYear()} days / 365 days`

const _getRegionTooltips = (abbr) => {
  if (abbr === 'Days in 2021') return _getDaysTooltip()

  return _getVaccinatedTooltip(abbr)
}

const Home = () => (
  <Layout title="Canada Vaccine Tracker">
    <div>
      <section>
        <h1>
          <span className="visuallyHidden">Total vaccines administered in </span>Canada
        </h1>
        <p>Number of administered vaccines as a percentage of Canada’s population.</p>
        <div className="chart">
          <VictoryChart height={140} width={360} theme={theme}>
            <VictoryLegend
              x={50}
              y={15}
              orientation="horizontal"
              gutter={20}
              style={{
                border: { stroke: 'black', strokeWidth: 2 },
                data: { width: 10, stroke: colors.QcBlueDark, strokeWidth: 1 },
              }}
              colorScale={[colors.QcOrangeAccent, colors.QcBlueLight]}
              data={[{ name: 'Vaccinations administered' }, { name: 'Days in 2021' }]}
            />
            <VictoryAxis />
            <VictoryAxis
              dependentAxis
              domain={[0, 100]}
              tickValues={[canadaDays[0].y, 50, 75, 100]}
              tickFormat={(t) => `${t}%`}
              orientation="bottom"
            />
            <VictoryLine
              style={{
                data: {
                  stroke: colors.CanadaRed,
                  strokeWidth: 0.5,
                  strokeDasharray: '4, 4',
                },
                labels: { angle: 0, fill: colors.CanadaRed, fontSize: 8, padding: 5 },
              }}
              labels={['September 31']}
              labelComponent={<VictoryLabel y={80} />}
              y={() => 75}
            />
            <VictoryGroup
              horizontal
              offset={18}
              style={{
                data: { width: 10, stroke: colors.QcBlueDark, strokeWidth: 1 },
              }}
              colorScale={[colors.QcBlueLight, colors.QcOrangeAccent]}
            >
              <VictoryBar
                name="bar-days"
                animate={{
                  duration: 1500,
                  onLoad: { duration: 500 },
                }}
                data={canadaDays}
                labels={({ datum }) => `${getDayOfYear()} days (${datum.y}%)`}
                labelComponent={<CustomLabel tooltipLabel={() => _getDaysTooltip()} />}
              />
              <VictoryBar
                animate={{
                  duration: 1500,
                  onLoad: { duration: 500 },
                }}
                name="bar-vaccines"
                data={canadaVaccines}
                labels={({ datum }) => `613k vaccines (${datum.y}%)`}
                labelComponent={
                  <CustomLabel tooltipLabel={(label) => _getRegionTooltips(label.datum.x)} />
                }
              />
            </VictoryGroup>
          </VictoryChart>
        </div>

        <p>Last updated: Monday at 6:40 pm EST.</p>

        <h3>More info</h3>
        <p className="smalltext">
          This is a very rough measure at the minute. “Vaccinated Canadians” is different than
          “vaccines administered”. For a bit more clarity, have a look under Sources.
        </p>
        <div>
          <a href="#">source link</a>
        </div>
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
              x={50}
              y={15}
              orientation="horizontal"
              gutter={20}
              style={{
                border: { stroke: 'black', strokeWidth: 2 },
                data: { width: 10, stroke: colors.QcBlueDark, strokeWidth: 1 },
              }}
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
              tickValues={[canadaDays[0].y, 50, 75, 100]}
              tickFormat={(t) => `${t}%`}
              orientation="bottom"
            />

            <VictoryGroup
              horizontal
              offset={10}
              style={{
                data: { width: 10, stroke: colors.QcBlueDark, strokeWidth: 1 },
              }}
            >
              <VictoryBar
                animate={{
                  duration: 1500,
                  onLoad: { duration: 500 },
                }}
                name="bar-vaccines"
                data={regionVaccines}
                labels={({ datum }) => `${datum.y}%`}
                style={{
                  data: {
                    fill: ({ datum }) => datum.fill || colors.QcOrangeAccent,
                  },
                }}
                labelComponent={
                  <CustomLabel tooltipLabel={(label) => _getRegionTooltips(label.datum.x)} />
                }
              />
            </VictoryGroup>
            <VictoryLine
              style={{
                data: {
                  stroke: colors.CanadaRed,
                  strokeWidth: 0.5,
                  strokeDasharray: '4, 4',
                },
                labels: { angle: 0, fill: colors.CanadaRed, fontSize: 8, padding: 5 },
              }}
              labels={['September 31']}
              labelComponent={<VictoryLabel y={342} />}
              y={() => 75}
            />
          </VictoryChart>
        </div>

        <p>Last updated: Monday at 6:40 pm EST.</p>

        <h3>More info</h3>
        <p className="smalltext">
          The provinces and territories send updates at different points, so the number of second
          doses hasn’t yet been incorporated.
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
