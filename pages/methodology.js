import Layout from '../components/Layout'
import Link from 'next/link'

export default function About() {
  return (
    <Layout title="Methodology">
      <section>
        <h1>Methodology</h1>
        <p>
          Justin Trudeau announced that “
          <Link href="https://www.thestar.com/politics/federal/2021/01/12/justin-trudeau-says-that-canada-will-have-enough-covid-19-vaccines-for-everyone-by-the-end-of-september.html">
            <a target="blank">every Canadian who wants a vaccine [will] receive one by September</a>
          </Link>
          .”
        </p>
        <p>
          The <abbr title="World Health Organization">WHO</abbr> has also estimated that a “
          <Link href="https://www.reuters.com/article/us-health-coronavirus-immunity-analysis-idUSKBN27Y124">
            <a target="blank">
              65-70% vaccine coverage rate [is] a way to reach population immunity
            </a>
          </Link>
          .”
        </p>
        <p>
          September 13 is 70% of the way through a year, which lines up pretty well with when
          Trudeau said that vaccines should be generally available. It seems to me that we would be
          in really good shape if 70% of Canadians were vaccinated by mid-September.
        </p>
        <h2>Caveats</h2>
        <p>
          “Fully-vaccinated Canadians” is a different number than “Vaccine doses administered”
          (which I am currently using). The data up to now has been pretty spotty, but it seems like
          the way to go would be more like “Canadians who have received at least one dose”.
        </p>
        <p>I will be changing the graphs around a bit as I continue to make updates.</p>
      </section>
    </Layout>
  )
}
