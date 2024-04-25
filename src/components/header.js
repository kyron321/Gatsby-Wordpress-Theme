import * as React from "react"
import { Link } from "gatsby"
import useGetWebsiteOptions from "../graphql/useGetWebsiteOptions"
import '../scss/header.scss';

const Header = ({ siteTitle }) => (
  <header>
    <Link to="/" style={{fontSize: `var(--font-sm)`,textDecoration: `none`,}}>
      <img class="logo" src={useGetWebsiteOptions().siteLogo.node.sourceUrl} alt={useGetWebsiteOptions().siteLogo.node.altText}/>
    </Link>
  </header>
)

export default Header
