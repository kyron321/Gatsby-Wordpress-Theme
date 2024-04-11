const data = useStaticQuery(graphql`
query SiteTitleQuery {
  site {
    siteMetadata {
      title
    }
  }
}
`)