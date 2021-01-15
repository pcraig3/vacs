import React from "react"
import Head from "../components/head"
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
} from "victory"

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
  { x: "qc", y: getPercent({ numerator: dayOfYear, denominator: daysInYear }) },
]
const dataVaccines = [
  { x: "qc", y: getPercent({ numerator: vaccines, denominator: population }) },
]

// Typography
const sansSerif = "'Helvetica Neue', 'Helvetica', sans-serif"
const letterSpacing = "normal"
const fontSize = 12

// Layout
const padding = 8
const baseProps = {
  width: 350,
  height: 350,
  padding: 50,
}

// Colors
const black = "#000000"
const white = "#FFFFFF"
const darkGrey = "#2e2e2e"
const lightGrey = "#e2e2e2"
const grey900 = "#212121"

const QcBlueLight = "#b9cde0"
const QcBlueDark = "#223654"

// * Labels
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding,
  fill: black,
  stroke: "transparent",
  strokeWidth: 0,
}

const centeredLabelStyles = Object.assign(
  { textAnchor: "middle" },
  baseLabelStyles
)

// Strokes
const strokeDasharray = "10, 5"
const strokeLinecap = "round"
const strokeLinejoin = "round"

const theme = {
  axis: Object.assign(
    {
      style: {
        axis: {
          fill: "transparent",
          stroke: darkGrey,
          strokeWidth: 2,
          strokeLinecap,
          strokeLinejoin,
        },
        axisLabel: Object.assign({}, centeredLabelStyles, {
          padding,
          stroke: "transparent",
        }),
        grid: {
          fill: "none",
          stroke: lightGrey,
          strokeDasharray,
          strokeLinecap,
          strokeLinejoin,
          pointerEvents: "painted",
        },
        ticks: {
          fill: "transparent",
          size: 5,
          stroke: darkGrey,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin,
        },
        tickLabels: Object.assign({}, baseLabelStyles, {
          fill: black,
        }),
      },
    },
    baseProps
  ),
  bar: {
    style: {
      data: {
        padding,
        strokeWidth: 0,
      },
      labels: baseLabelStyles,
    },
  },
  baseProps,
  chart: baseProps,
  tooltip: {
    style: Object.assign({}, baseLabelStyles, {
      padding: 0,
      pointerEvents: "none",
    }),
    flyoutStyle: {
      stroke: grey900,
      strokeWidth: 1,
      fill: "#f0f0f0",
      pointerEvents: "none",
    },
    flyoutPadding: 5,
    cornerRadius: 5,
    pointerLength: 10,
  },
}

const Home = () => (
  <div>
    <Head title="Home" />

    <h1>Vaccine tracker</h1>
    <p>Only for quebec so far</p>

    <VictoryChart height={150} theme={theme}>
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
        tickValues={[0, 25, 50, 75, 100]}
        tickFormat={["Jan", "Mar", "June", "Sept", "Dec"]}
        orientation="bottom"
      />
      <VictoryAxis />
      <VictoryGroup
        horizontal
        offset={20}
        style={{ data: { width: 10, stroke: QcBlueDark, strokeWidth: 1 } }}
        colorScale={[QcBlueLight, "#E1775A"]}
      >
        <VictoryBar
          data={dataDays}
          labels={({ datum }) => `days in 2021: ${datum.y}%`}
        />
        <VictoryBar
          data={dataVaccines}
          labels={({ datum }) => `vaccines: ${datum.y}%`}
        />
      </VictoryGroup>
    </VictoryChart>

    <p>
      <sub>*you need 2 shots of the vaccine. 😬</sub>
    </p>

    <style jsx>{``}</style>
  </div>
)

export default Home
