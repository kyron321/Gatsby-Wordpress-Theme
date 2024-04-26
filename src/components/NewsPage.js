import React from 'react';
import { Link } from 'gatsby';
import useGetPosts from '../graphql/useGetPosts';

const NewsPage = () => {
  const posts = useGetPosts();

  return (
    <div>
      <h1>Latest Posts</h1>
      <ul>
      {posts.map((post, index) => (
          <li key={post.id || index}>
            <h2><Link to={`/post/${post.slug}`}>{post.title}</Link></h2>
            <p>{post.date}</p>
            {post.featuredImage && post.featuredImage.node && <img src={post.featuredImage.node.mediaItemUrl} alt={post.title} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPage;