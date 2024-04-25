import * as React from "react"
import { Link } from "gatsby"
import useGetWebsiteOptions from "../graphql/useGetWebsiteOptions"
import '../scss/header.scss';

const Header = ({ siteTitle }) => (
  <header class="header-container">
    <div class="header-inner">
    <Link to="/">
      <img class="logo" src={useGetWebsiteOptions().siteLogo.node.sourceUrl} alt={useGetWebsiteOptions().siteLogo.node.altText}/>
    </Link>
    </div>
  </header>
)

export default Header
