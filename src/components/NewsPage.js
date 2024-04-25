import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import useGetPosts from '../graphql/useGetPosts';

const NewsPage = () => {
  const posts = useGetPosts();

  return (
    <div>
      <h1>Latest Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2><Link to={`/post/${post.slug}`}>{post.title}</Link></h2>
            <p>{post.date}</p>
            {post.featuredImage && post.featuredImage.node && (
              <GatsbyImage image={getImage(post.featuredImage.node)} alt={post.title} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPage;