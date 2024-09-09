/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import CanvasBackground from "./CanvasBackground"
import "../scss/base/typography.scss"
import "../scss/base/scroll.scss"
import "../scss/base/container.scss"
import '../scss/newspage.scss';
import { Helmet } from "react-helmet"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Helmet>
      <link rel="preload" href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" as="style" />
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" />
      </Helmet>
      <CanvasBackground />
      {/* <Header siteTitle={data.site.siteMetadata?.title || `Title`} /> */}
        <main className="main-container">{children}</main>  
    </>
  )
}

export default Layout
