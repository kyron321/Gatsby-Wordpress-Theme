import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Helmet } from "react-helmet";

// This is the GraphQL query that fetches the data for a single post
export const query = graphql`
  query GetPost($slug: String!) {
    wpcontent {
      postBy(slug: $slug) {
        title
        content
        excerpt
      }
    }
  }
`;

// This is the React component that displays the data for a single post
const PostTemplate = ({ data }) => {
  const post = data.wpcontent.postBy;

  return (
    <Layout>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </Layout>
  );
};

export default PostTemplate;