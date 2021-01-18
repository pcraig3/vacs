import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
} from "victory"

import Layout from "../components/Layout"
import CustomLabel from "../components/CustomLabel"

import { colors, theme } from "../styles/_theme"
import { canadaDays, canadaVaccines, regionVaccines } from "../data/canada"
import { formatNumberWithCommas, getDayOfYear } from "../data"
import regions from "../data/_regions"

const _getVaccinatedTooltip = (abbr) => {
  return `${formatNumberWithCommas(
    regions[abbr].vaccines
  )} vaccinated / ${formatNumberWithCommas(regions[abbr].population)} people`
}

const _getDaysTooltip = () => `${getDayOfYear()} days / 365 days`

const _getRegionTooltips = (abbr) => {
  if (abbr === "Days in 2021") return _getDaysTooltip()

  return _getVaccinatedTooltip(abbr)
}

const Home = () => (
  <Layout title="Canada Vaccine Tracker">
    <div>
      <section>
        <h2>Canada</h2>
        <p>
          Tracking the proportion of Canadians who have received a vaccine in
          2021.
        </p>

        <div className="chart">
          <VictoryChart height={140} width={360} theme={theme}>
            <VictoryLegend
              x={50}
              y={15}
              orientation="horizontal"
              gutter={10}
              style={{
                border: { stroke: "black", strokeWidth: 2 },
                data: { width: 10, stroke: colors.QcBlueDark, strokeWidth: 1 },
              }}
              colorScale={[colors.QcOrangeAccent, colors.QcBlueLight]}
              data={[{ name: "Vaccinations" }, { name: "Days in 2021" }]}
            />
            <VictoryAxis />
            <VictoryAxis
              dependentAxis
              domain={[0, 100]}
              tickValues={[4.9, 25, 50, 75, 100]}
              orientation="bottom"
            />
            <VictoryLine
              style={{
                data: {
                  stroke: "red",
                  strokeWidth: 0.5,
                  strokeDasharray: "4, 4",
                },
                labels: { angle: 0, fill: "red", fontSize: 8, padding: 5 },
              }}
              labels={["September 31"]}
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
                labels={({ datum }) => `${datum.y}%`}
                labelComponent={
                  <CustomLabel
                    tooltipLabel={() => `${getDayOfYear()} days / 365 days`}
                  />
                }
              />
              <VictoryBar
                animate={{
                  duration: 1500,
                  onLoad: { duration: 500 },
                }}
                name="bar-vaccines"
                data={canadaVaccines}
                labels={({ datum }) => `${datum.y}%`}
                labelComponent={
                  <CustomLabel
                    tooltipLabel={() =>
                      `${formatNumberWithCommas(
                        regions.CAN.vaccines
                      )} vaccinated / ${formatNumberWithCommas(
                        regions.CAN.population
                      )} people`
                    }
                  />
                }
              />
            </VictoryGroup>
          </VictoryChart>
        </div>

        <p>
          <sub>*you need 2 shots of the vaccine. 😬</sub>
        </p>
        <div>
          <a href="#">source link</a>
        </div>
      </section>

      <section>
        <h2>By region</h2>
        <p>Vaccinations by percentage of population across Canada.</p>

        <div className="chart">
          <VictoryChart
            height={400}
            width={360}
            domainPadding={8}
            theme={theme}
          >
            <VictoryLegend
              x={50}
              y={15}
              orientation="horizontal"
              gutter={10}
              style={{
                border: { stroke: "black", strokeWidth: 2 },
                data: { width: 10, stroke: colors.QcBlueDark, strokeWidth: 1 },
              }}
              colorScale={[colors.QcOrangeAccent, colors.QcBlueLight]}
              data={[{ name: "Vaccinations" }, { name: "Days in 2021" }]}
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
              tickValues={[4.9, 50, 100]}
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
                  <CustomLabel
                    tooltipLabel={(label) => _getRegionTooltips(label.datum.x)}
                  />
                }
              />
            </VictoryGroup>
            <VictoryLine
              style={{
                data: {
                  stroke: "red",
                  strokeWidth: 0.5,
                  strokeDasharray: "4, 4",
                },
                labels: { angle: 0, fill: "red", fontSize: 8, padding: 5 },
              }}
              labels={["September 31"]}
              labelComponent={<VictoryLabel y={342} />}
              y={() => 75}
            />
          </VictoryChart>
        </div>

        <p>Some interesting and useful fact, probably.</p>
        <div>
          <a href="#">source link</a>
        </div>
      </section>

      <style jsx>{`
        section {
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
        }

        section > h2 ~ * {
          width: 67%;
          align-self: flex-end;
        }

        section > h2 ~ .chart {
          width: 77.7%;
        }
      `}</style>
    </div>
  </Layout>
)

export default Home
