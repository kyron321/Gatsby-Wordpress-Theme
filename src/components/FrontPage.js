import React from 'react';
import useGetFrontPage from '../graphql/useGetFrontPage';
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Helmet } from "react-helmet";
import parse, { domToReact } from 'html-react-parser';
import Banner from '../blocks/banner';
import PostsSlider from "../blocks/posts-slider";
import StarCanvas from "../blocks/star-canvas";
import TwoColumnImage from '../blocks/two-column-image';

const FrontPage = () => {
  const data = useGetFrontPage();

  // Find the object where isFrontPage is true
  const page = data.find(item => item.isFrontPage);

  const blockComponents = {
    'register-wordpress-banner-block': Banner,
    'register-wordpress-posts-slider' : PostsSlider,
    'register-wordpress-star-canvas' : StarCanvas,
    'register-wordpress-two-column-image': TwoColumnImage
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
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.title}/>
      </Helmet>
      <div>
        {typeof page.content === 'string' ? parse(page.content, options) : null}
      </div>
    </>
  );
};

export default FrontPage;