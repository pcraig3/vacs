import HTMLHead from "../components/head"
import Header from "../components/Header"

function Layout({ children, title = "Canada Vaccines Tracker" }) {
  return (
    <div>
      <HTMLHead title={title} />

      <Header />
      <main>{children}</main>

      <style jsx>{`
        header {
          border-bottom: 3px solid black;
        }
      `}</style>
    </div>
  )
}

export default Layout
