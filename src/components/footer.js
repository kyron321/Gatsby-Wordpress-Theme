import * as React from "react"
import { Link } from "gatsby"
import useGetWebsiteOptions from "../graphql/useGetWebsiteOptions"
import useGetMenuItems from "../graphql/useGetMenuItems";
import '../scss/header.scss';

const Header = ({ siteTitle }) => (
  <header className="header-container">
    <div className="header-inner">
    <Link to="/">
      <img className="logo" src={useGetWebsiteOptions().siteLogo.node.sourceUrl} alt={useGetWebsiteOptions().siteLogo.node.altText}/>
    </Link>
    <Menu />
    </div>
  </header>
)

export default Header
