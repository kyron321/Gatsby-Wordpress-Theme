import { graphql, useStaticQuery } from 'gatsby';

const useGetPosts = () => {
  const data = useStaticQuery(graphql`
  query GetPosts {
    wpcontent {
      posts {
        nodes {
          title
          databaseId
          date
          content
          slug
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
  `);

  return data.wpcontent.posts.nodes;
};

export default useGetPosts;

