import * as React from 'react';
import useGetPosts from '../graphql/useGetPosts';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useStaticQuery, graphql } from 'gatsby';

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', zIndex: 1, cursor: 'pointer', left: '-25px', background: 'none' }} // Customize the style
      onClick={onClick}
    >
      <div style={{
        width: '48px',
        height: '48px',
        borderTop: '6px solid white',
        borderRight: '6px solid white',
        transform: 'rotate(-135deg)',
        margin: '0 auto'
      }} />
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', zIndex: 1, cursor: 'pointer', right: '-25px', background: 'none' }} // Customize the style
      onClick={onClick}
    >
      <div style={{

        width: '48px',
        height: '48px',
        borderTop: '6px solid white',
        borderRight: '6px solid white',
        transform: 'rotate(45deg)',
        margin: '0 auto'
      }} />
    </div>
  );
};

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
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    swipe: true,
    centerMode: true, // Enable center mode
    centerPadding: '0', // Remove padding around the center slide
    prevArrow: <CustomPrevArrow />, // Custom previous arrow
    nextArrow: <CustomNextArrow /> // Custom next arrow
  };

  return (
    <section className="posts-slider-block">
      <div className='post-slider-container'>
        <h2 className='post-slider-title'>Projects</h2>
        <Slider {...settings}>
          {posts.slice(0, 4).map((post, index) => {
            const postUrl = new URL(post.uri, siteUrl);
            postUrl.pathname = `/post${postUrl.pathname}`;
            return (
              <div key={post.id || index} className="post-card">
                <a href={postUrl.href}>
                  {post.featuredImage && post.featuredImage.node && <img className="post-image" src={post.featuredImage.node.mediaItemUrl} alt={post.title} />}
                  <div className="overlay">
                    <h3>{post.title}</h3>
                  </div>
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