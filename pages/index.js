import React from "react"
import Link from "next/link"
import Head from "../components/head"
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory"

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
]

const Home = () => (
  <div>
    <Head title="Home" />

    <h1>Hello all</h1>
    <p>Thanks for coming to my site!!</p>
    <p>See you in the future!!</p>
    <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickValues={[1, 2, 3, 4]}
        tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
      />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={(x) => `$${x / 1000}k`}
      />
      <VictoryBar
        horizontal
        data={data}
        // data accessor for x values
        x="quarter"
        // data accessor for y values
        y="earnings"
      />
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
