import { graphql, useStaticQuery } from 'gatsby';

const useGetWebsiteOptions = () => {
  const data = useStaticQuery(graphql`
  query GetWebsiteOptions {
    wpcontent {
      siteOptions {
        websiteOptions {
          siteLogo {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
  `);

  return data.wpcontent.siteOptions.websiteOptions;
};

export default useGetWebsiteOptions;
