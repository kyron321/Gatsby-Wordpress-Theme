import { graphql, useStaticQuery } from 'gatsby';

const useGetFrontPage = () => {
  const data = useStaticQuery(graphql`
  query GetFrontPage {
    wpcontent {
      pages {
        nodes {
          isFrontPage
          title
          content
        }
      }
    }
  }
  `);

  return data.wpcontent.pages.nodes;
};

export default useGetFrontPage;

