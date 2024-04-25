import { graphql, useStaticQuery } from 'gatsby';

const useGetFrontPage = () => {
  const data = useStaticQuery(graphql`
  query GetFrontPage {
    wpcontent {
      pages {
        nodes {
          isFrontPage
          blockBanner {
            bannerImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  }
  `);

  return data.wpcontent.pages.nodes;
};

export default useGetFrontPage;

