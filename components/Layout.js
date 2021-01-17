import HTMLHead from "../components/head"
import Header from "../components/Header"
import { space } from "../styles/_theme"

function Layout({ children, title = "Canada Vaccines Tracker" }) {
  return (
    <div>
      <HTMLHead title={title} />

      <Header />
      <main>{children}</main>

      <style jsx>{`
        main {
          padding: ${space.sm} ${space.xs};
        }
      `}</style>
    </div>
  )
}

export default Layout
