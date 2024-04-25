// src/pages/index.js

import React from 'react';
import Layout from '../components/Layout';
import FrontPage from '../components/FrontPage';
import NewsPage from '../components/NewsPage';


const IndexPage = () => {
  return (
    <Layout>
      <FrontPage />
      <NewsPage/>
    </Layout>
  );
};

export default IndexPage;
