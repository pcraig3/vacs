import Layout from "../components/Layout"
import CustomLabel from "../components/CustomLabel"
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
} from "victory"

import { baseLabelStyles, colors, theme } from "../styles/_theme"

const dayOfYear = 17
const daysInYear = 365

const vaccines = 137856
const population = 8485000

// round to one digit
const getPercent = ({ numerator, denominator }) => {
  const percentage = (numerator / denominator) * 100
  return Math.round((percentage + Number.EPSILON) * 10) / 10
}

const dataDays = [
  {
    x: "qc",
    y: getPercent({ numerator: dayOfYear, denominator: daysInYear }),
  },
]

const dataVaccines = {
  can: [
    {
      x: "can",
      y: getPercent({ numerator: 556681, denominator: 37590000 }),
    },
  ],
  qc: [
    {
      x: "qc",
      y: getPercent({ numerator: vaccines, denominator: population }),
    },
  ],
}

const Home = () => (
  <Layout title="Canada Vaccine Tracker">
    <div>
      <section>
        <h2>Canada</h2>
        <p>Tracking the percent of Canada has received a vaccine in 2021.</p>

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
              tickValues={[25, 50, 75, 100]}
              orientation="bottom"
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
                data={[
                  {
                    x: "can",
                    y: getPercent({
                      numerator: dayOfYear,
                      denominator: daysInYear,
                    }),
                  },
                ]}
                labels={({ datum }) => `${datum.y}%`}
                labelComponent={
                  <CustomLabel
                    tooltipLabel={() => `${dayOfYear} days / 365 days`}
                  />
                }
              />
              <VictoryBar
                animate={{
                  duration: 1500,
                  onLoad: { duration: 500 },
                }}
                name="bar-vaccines"
                data={dataVaccines.can}
                labels={({ datum }) => `${datum.y}%`}
                labelComponent={
                  <CustomLabel
                    tooltipLabel={() =>
                      `${vaccines} vaccinated / 8,485,000 people`
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
              tickValues={[25, 50, 75, 100]}
              orientation="bottom"
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
                data={dataDays}
                labels={({ datum }) => `${datum.y}%`}
                labelComponent={
                  <CustomLabel
                    tooltipLabel={() => `${dayOfYear} days / 365 days`}
                  />
                }
              />
              <VictoryBar
                animate={{
                  duration: 1500,
                  onLoad: { duration: 500 },
                }}
                name="bar-vaccines"
                data={dataVaccines.qc}
                labels={({ datum }) => `${datum.y}%`}
                labelComponent={
                  <CustomLabel
                    tooltipLabel={() =>
                      `${vaccines} vaccinated / 8,485,000 people`
                    }
                  />
                }
              />
            </VictoryGroup>
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
