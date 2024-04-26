import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Helmet } from "react-helmet";

// This is the GraphQL query that fetches the data for a single page
export const query = graphql`
  query GetPage($id: ID!) {
    wpcontent {
      page(id: $id) {
        title
        content
      }
    }
  }
`;

// This is the React component that displays the data for a single page
const PageTemplate = ({ data }) => {
  const page = data.wpcontent.page;

  return (
    <Layout>
      <Helmet>
        <title>{page.title}</title>
      </Helmet>
      <div>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </Layout>
  );
};

export default PageTemplate;