import React from 'react';
import { Link } from 'gatsby';
import useGetFrontPage from '../graphql/useGetFrontPage';

const FrontPage = () => {
    const data = useGetFrontPage();
  
    // Find the object where isFrontPage is true
    const frontPageObject = data.find(item => item.isFrontPage);
    
  
    // Access the blockBanner property
    const blockBanner = frontPageObject ? frontPageObject.blockBanner : null;
  
    return (
        <div>
        {blockBanner && blockBanner.bannerImage && blockBanner.bannerImage.node ? (
          <img
            src={blockBanner.bannerImage.node.sourceUrl}
            alt={blockBanner.bannerImage.node.altText}
            style={{width: '100%'}}
          />
        ) : null}
      </div>
    );
  };

export default FrontPage;