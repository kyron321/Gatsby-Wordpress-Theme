exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  // Fetch the posts using a GraphQL query
  const result = await graphql(`
    query GetPosts {
      wpcontent {
        posts {
          nodes {
            slug
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
    path: `/post/${node.slug}`,
    component: require.resolve("./src/templates/post.js"),
    context: {
      slug: node.slug,
    },
  });
});
}