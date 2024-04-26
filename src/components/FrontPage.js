import React from 'react';
import useGetFrontPage from '../graphql/useGetFrontPage';

const FrontPage = () => {
    const data = useGetFrontPage();
  
    // Find the object where isFrontPage is true
    const frontPageObject = data.find(item => item.isFrontPage);
  
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    );
  };

export default FrontPage;