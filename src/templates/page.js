import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Helmet } from "react-helmet";
import parse, { domToReact } from 'html-react-parser';
import Banner from '../blocks/banner';
import TwoColumnImage from "../blocks/two-column-image";
import * as blocks from '../blocks/map';

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

const PageTemplate = ({ data }) => {
  const page = data.wpcontent.page;
  
  const blockComponents = {
    'register-wordpress-banner-block': Banner,
    'register-wordpress-two-column-image-block': TwoColumnImage,
    // Add more mappings for other block types
  };
  
  const options = {
    replace: ({ attribs, children }) => {
      if (!attribs) return;
  
      const BlockComponent = blockComponents[attribs.id];
      if (BlockComponent) {
        return <BlockComponent attribs={attribs} children={domToReact(children, options)} />;
      }
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.title}/>
      </Helmet>
      <div>
        {typeof page.content === 'string' ? parse(page.content, options) : null}
      </div>
    </Layout>
  );
};

export default PageTemplate;