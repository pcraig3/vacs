import Link from "next/link"
import { space } from "../styles/_theme"

function Header() {
  return (
    <header>
      <div class="logo">
        <span aria-hidden="true">🍁</span> Canada Vaccines Tracker
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        header {
          border-bottom: 3px solid black;
          display: flex;
          justify-content: space-between;
          padding: ${space.sm} ${space.xs};
        }

        ul li {
          display: inline-block;
          margin-left: ${space.sm};
        }
      `}</style>
    </header>
  )
}

export default Header
