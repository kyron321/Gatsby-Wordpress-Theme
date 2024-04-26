exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  // Fetch the posts using a GraphQL query
  const resultPosts = await graphql(`
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
  if (resultPosts.errors) {
    console.error(resultPosts.errors);
    throw new Error('Failed to fetch posts');
  }

  // Create a page for each post
  resultPosts.data.wpcontent.posts.nodes.forEach(node => {
    createPage({
      path: `/post/${node.slug}`,
      component: require.resolve("./src/templates/post.js"),
      context: {
        slug: node.slug,
      },
    });
  });

 // Fetch the pages using a GraphQL query
const resultPages = await graphql(`
query GetPages {
  wpcontent {
    pages {
      nodes {
        id
        slug
      }
    }
  }
}
`);

// Check if there are any errors in the query
if (resultPages.errors) {
console.error(resultPages.errors);
throw new Error('Failed to fetch pages');
}

// Create a page for each page
resultPages.data.wpcontent.pages.nodes.forEach(node => {
createPage({
  path: `/${node.slug}`,
  component: require.resolve("./src/templates/page.js"),
  context: {
    id: node.id,
  },
});
});
}