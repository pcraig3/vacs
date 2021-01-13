import React from "react"
import Head from "../components/head"
import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup } from "victory"

const dayOfYear = 13
const daysInYear = 365

const vaccines = 99510
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

const Home = () => (
  <div>
    <Head title="Home" />

    <h1>Vaccine tracker</h1>
    <p>Only for quebec so far</p>

    <VictoryChart height={150}>
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
        style={{ data: { width: 10 } }}
        colorScale={["brown", "tomato", "gold"]}
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

    <style jsx>{`
      /* https://dev.to/hankchizljaw/a-modern-css-reset-6p3 */
      /* Box sizing rules */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      /* Remove default padding */
      ul[class],
      ol[class] {
        padding: 0;
      }

      /* Remove default margin */
      body,
      h1,
      h2,
      h3,
      h4,
      p,
      ul[class],
      ol[class],
      li,
      figure,
      figcaption,
      blockquote,
      dl,
      dd {
        margin: 0;
      }

      /* Set core body defaults */
      body {
        min-height: 100vh;
        scroll-behavior: smooth;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
      }

      /* Remove list styles on ul, ol elements with a class attribute */
      ul[class],
      ol[class] {
        list-style: none;
      }

      /* A elements that don't have a class get default styles */
      a:not([class]) {
        text-decoration-skip-ink: auto;
      }

      /* Make images easier to work with */
      img {
        max-width: 100%;
        display: block;
      }

      /* Natural flow and rhythm in articles by default */
      article > * + * {
        margin-top: 1em;
      }

      /* Inherit fonts for inputs and buttons */
      input,
      button,
      textarea,
      select {
        font: inherit;
      }

      /* Remove all animations and transitions for people that prefer not to see them */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `}</style>
  </div>
)

export default Home
