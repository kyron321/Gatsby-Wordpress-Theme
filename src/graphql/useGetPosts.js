import { graphql, useStaticQuery } from 'gatsby';

const useGetPosts = () => {
  const data = useStaticQuery(graphql`
  query GetPosts {
    wpcontent {
      posts {
        nodes {
          title
          date
          databaseId
          slug
        }
      }
    }
  }
  `);

  return data.wpcontent.posts.nodes;
};

export default useGetPosts;