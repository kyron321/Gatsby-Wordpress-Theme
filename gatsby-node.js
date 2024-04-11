exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  // Fetch the posts using a GraphQL query
  const result = await graphql(`
    query GetPosts {
      wpcontent {
        posts {
          nodes {
            databaseId
          }
        }
      }
    }
  `);

  // Check if there are any errors in the query
  if (result.errors) {
    console.error(result.errors);
    throw new Error('Failed to fetch posts');
  }

  // Create a page for each post
  result.data.wpcontent.posts.nodes.forEach(node => {
    createPage({
      path: `/post/${node.databaseId}`,
      component: require.resolve("./src/templates/post.js"),
      context: {
        id: node.databaseId,
      },
    });
  });

  // Create the existing page
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  });
};