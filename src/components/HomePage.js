import React from 'react';
import { Link } from 'gatsby';
import useGetPosts from '../graphql/useGetPosts';

const HomePage = () => {
  const posts = useGetPosts();

  return (
    <div>
      <h1>Latest Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
<h2><Link to={`/post/${post.slug}`}>{post.title}</Link></h2>
            <p>{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;