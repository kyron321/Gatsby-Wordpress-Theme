import React, { useEffect, useRef } from 'react';
import useGetFrontPage from '../graphql/useGetFrontPage';
import { graphql } from "gatsby";
import Footer from './footer';
import Layout from "../components/layout";
import { Helmet } from "react-helmet";
import parse, { domToReact } from 'html-react-parser';
import Banner from '../blocks/banner';
import PostsSlider from "../blocks/posts-slider";
import StarCanvas from "../blocks/star-canvas";
import TwoColumnImage from '../blocks/two-column-image';
import FeaturedSkills from '../blocks/featured-skills';
import TwoColumnCard from '../blocks/two-column-card';
import Contact from '../blocks/contact';

const FrontPage = () => {
  const data = useGetFrontPage();
  const sectionsRef = useRef([]);
  const currentSectionIndex = useRef(0);

  // Find the object where isFrontPage is true
  const page = data.find(item => item.isFrontPage);

  const blockComponents = {
    'register-wordpress-banner-block': Banner,
    'register-wordpress-posts-slider' : PostsSlider,
    'register-wordpress-star-canvas' : StarCanvas,
    'register-wordpress-two-column-image': TwoColumnImage,
    'register-wordpress-featured-skills': FeaturedSkills,
    'register-wordpress-two-column-card': TwoColumnCard,
    'register-wordpress-contact-block': Contact
    // Add more mappings for other block types
  };

  const options = {
    replace: ({ attribs, children }) => {
      if (!attribs) return;
  
      const BlockComponent = blockComponents[attribs.id];
      if (BlockComponent) {
        const sectionClass = attribs.class || `section-${sectionsRef.current.length}`;
        sectionsRef.current.push(sectionClass);
        return <div className={sectionClass}><BlockComponent attribs={attribs} children={domToReact(children, options)} /></div>;
      }
    },
  };

  // useEffect(() => {
  //   // Add footer to sectionsRef
  //   sectionsRef.current.push('footer-container');
  
  //   let debounceTimeout;
  
  //   const handleScroll = (event) => {
  //     event.preventDefault();
  //     clearTimeout(debounceTimeout);
  //     debounceTimeout = setTimeout(() => {
  //       const delta = Math.sign(event.deltaY);
  //       if (delta !== 0) {
  //         currentSectionIndex.current = Math.min(
  //           Math.max(currentSectionIndex.current + delta, 0),
  //           sectionsRef.current.length - 1
  //         );
  //         const nextSection = document.querySelector(`.${sectionsRef.current[currentSectionIndex.current]}`);
  //         if (nextSection) {
  //           window.scrollTo({
  //             top: nextSection.offsetTop,
  //             behavior: 'smooth'
  //           });
  //         }
  //       }
  //     }, 50); // Adjust the debounce delay as needed
  //   };
  
  //   window.addEventListener('wheel', handleScroll, { passive: false });
  
  //   return () => {
  //     window.removeEventListener('wheel', handleScroll);
  //     clearTimeout(debounceTimeout);
  //   };
  // }, []);

  return (
<>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.title}/>
      </Helmet>
      <div>
        {typeof page.content === 'string' ? parse(page.content, options) : null}
      </div>
      <Footer />
      </>
  );
};

export default FrontPage;