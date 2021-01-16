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

const dayOfYear = 15
const daysInYear = 365

const vaccines = 127073
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
const dataVaccines = [
  {
    x: "qc",
    y: getPercent({ numerator: vaccines, denominator: population }),
  },
]

const Home = () => (
  <Layout title="Canada Vaccines Tracker">
    <div>
      <section>
        <h2>Canada</h2>
        <p>Only for quebec so far</p>

        <div className="chart">
          <VictoryChart height={150} theme={theme}>
            <VictoryLegend
              x={90}
              y={130}
              orientation="horizontal"
              gutter={10}
              style={{
                border: { stroke: "black" },
                data: { width: 10, stroke: colors.QcBlueDark, strokeWidth: 1 },
              }}
              colorScale={[colors.QcOrangeAccent, colors.QcBlueLight]}
              data={[{ name: "Days in 2021" }, { name: "Vaccinations" }]}
            />

            <VictoryLabel
              text="Quebec Vaccinations"
              x={175}
              y={40}
              style={baseLabelStyles}
              textAnchor="middle"
            />
            <VictoryAxis
              dependentAxis
              domain={[0, 100]}
              tickValues={[25, 50, 75, 100]}
              orientation="bottom"
            />
            <VictoryAxis />
            <VictoryGroup
              horizontal
              offset={20}
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
                data={dataVaccines}
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
        <h2>Regions</h2>
        <p>For all the provinces and territores</p>

        <div className="chart">
          <VictoryChart height={150} theme={theme}>
            <VictoryLegend
              x={90}
              y={130}
              orientation="horizontal"
              gutter={10}
              style={{
                border: { stroke: "black" },
                data: { width: 10, stroke: colors.QcBlueDark, strokeWidth: 1 },
              }}
              colorScale={[colors.QcOrangeAccent, colors.QcBlueLight]}
              data={[{ name: "Days in 2021" }, { name: "Vaccinations" }]}
            />

            <VictoryLabel
              text="Vaccinations across Canada"
              x={175}
              y={40}
              style={baseLabelStyles}
              textAnchor="middle"
            />
            <VictoryAxis
              dependentAxis
              domain={[0, 100]}
              tickValues={[25, 50, 75, 100]}
              orientation="bottom"
            />
            <VictoryAxis />
            <VictoryGroup
              horizontal
              offset={20}
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
                data={dataVaccines}
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
          width: 67% !important;
          align-self: flex-end;
        }
      `}</style>
    </div>
  </Layout>
)

export default Home