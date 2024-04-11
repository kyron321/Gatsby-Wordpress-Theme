import React from "react";
import { graphql } from "gatsby";

// This is the GraphQL query that fetches the data for a single post
export const query = graphql`
  query GetPost($id: ID!) {
    wpcontent {
      post(id: $id, idType: DATABASE_ID) {
        title
        date
        content
      }
    }
  }
`;

// This is the React component that displays the data for a single post
const PostTemplate = ({ data }) => {
    console.log(data);
  const post = data.wpcontent.post;

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default PostTemplate;