import * as React from 'react';
import useGetPosts from '../graphql/useGetPosts';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useStaticQuery, graphql } from 'gatsby';

const PostsSlider = ({ attribs, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  const siteUrl = data.site.siteMetadata.siteUrl;

  const childrenArray = React.Children.toArray(children);
  const registerPostSlider = childrenArray.find(child => child.type === 'register-wordpress-posts-slider');

  const posts = useGetPosts();

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: false,
  };

  return (
    <section className="posts-slider-block">
      <div className='post-slider-container'>
        <h2 className='post-slider-title'>Latest Posts</h2>
        <Slider {...settings}>
          {posts.slice(0, 4).map((post, index) => {
            const postUrl = new URL(post.uri, siteUrl);
            postUrl.pathname = `/post${postUrl.pathname}`;
            return (
              <div key={post.id || index} className="post-card">
                <a href={postUrl.href}>
                  {post.featuredImage && post.featuredImage.node && <img className="post-image" src={post.featuredImage.node.mediaItemUrl} alt={post.title} />}
                  <p>Posted on {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <h3>{post.title}</h3>
                </a>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default PostsSlider;