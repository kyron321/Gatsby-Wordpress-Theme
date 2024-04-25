import * as React from "react"
import { Link } from "gatsby"
import useGetWebsiteOptions from "../graphql/useGetWebsiteOptions"

const Header = ({ siteTitle }) => (
  <header
    style={{
      margin: `0 auto`,
      padding: `var(--space-4) var(--size-gutter)`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
    }}
  >
    <Link
      to="/"
      style={{
        fontSize: `var(--font-sm)`,
        textDecoration: `none`,
      }}
    >
    <img
      src={useGetWebsiteOptions().siteLogo.node.sourceUrl}
      alt={useGetWebsiteOptions().siteLogo.node.altText}
      style={{
        width: `var(--size-8)`,
        height: `var(--size-8)`,
      }}
    />
        </Link>
  </header>
)

export default Header
