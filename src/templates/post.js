import React from "react";
import { graphql } from "gatsby";

// This is the GraphQL query that fetches the data for a single post
export const query = graphql`
  query GetPost($slug: String!) {
    wpcontent {
      postBy(slug: $slug) {
        title
        content
      }
    }
  }
`;

// This is the React component that displays the data for a single post
const PostTemplate = ({ data }) => {
    console.log(data);
  const post = data.wpcontent.postBy; // Changed from data.wpcontent.post

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default PostTemplate;