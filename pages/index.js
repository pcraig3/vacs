import React from "react"
import Link from "next/link"
import Head from "../components/head"
import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup } from "victory"

const data = [{ province: "qc", days: 13 }]
const data2 = [{ province: "qc", vaccines: 22000 }]

const Home = () => (
  <div>
    <Head title="Home" />

    <h1>Hello all</h1>
    <p>Thanks for coming to my site!!</p>
    <p>See you in the future!!</p>

    {/*  <VictoryAxis dependentAxis
            domain={[-10, 15]}
            offsetX={50}
            orientation="left"
            standalone={false}
            style={styles.axisOne}
    />

    <VictoryAxis dependentAxis
            domain={[0, 50]}
            orientation="right"
            standalone={false}
            style={styles.axisTwo}
          />

    */}
    <VictoryChart>
      <VictoryAxis
        dependentAxis
        domain={[0, 100]}
        orientation="top"
        standalone={true}
      />
      <VictoryAxis
        dependentAxis
        domain={[-10, 50]}
        maxDomain={{ y: 50 }}
        orientation="bottom"
        standalone={true}
      />
      <VictoryAxis />
      <VictoryGroup
        horizontal
        offset={10}
        style={{ data: { width: 6 } }}
        colorScale={["gold", "tomato"]}
      >
        <VictoryBar data={[{ x: "qc", y: 50 }]} />
        <VictoryBar data={[{ x: "qc", y: 5 }]} />
      </VictoryGroup>
    </VictoryChart>

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
