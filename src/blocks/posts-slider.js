import * as React from 'react';
import useGetPosts from '../graphql/useGetPosts';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const PostsSlider = ({ attribs, children }) => {
  const childrenArray = React.Children.toArray(children);
  const registerPostSlider = childrenArray.find(child => child.type === 'register-wordpress-posts-slider');

  const posts = useGetPosts();

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className='post-container'>
      <h2>Latest Posts</h2>
      <Slider {...settings}>
        {posts.slice(0, 4).map((post, index) => (
          <div key={post.id || index} className="post-card">
          <p>Posted on {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          {post.featuredImage && post.featuredImage.node && <img className="post-image" src={post.featuredImage.node.mediaItemUrl} alt={post.title} />}
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
        ))}
      </Slider>
    </div>
  );
};

export default PostsSlider;