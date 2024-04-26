import { graphql, useStaticQuery } from 'gatsby';

const useGetMenuItems = () => {
  const data = useStaticQuery(graphql`
  query GetMenuItems {
    wpcontent {
      menus {
        nodes {
          id
          databaseId
          name
          menuItems {
            edges {
              node {
                id
                label
                url
              }
            }
          }
        }
      }
    }
  }
  `);

  return data.wpcontent.menus.nodes;
};

export default useGetMenuItems;

