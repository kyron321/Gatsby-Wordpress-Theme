import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import useGetWebsiteOptions from '../graphql/useGetWebsiteOptions';
import useGetMenuItems from '../graphql/useGetMenuItems';
import Menu from './menu/menu';
import '../scss/header.scss';

const Header = ({ siteTitle }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setIsScrolled(isScrolled);
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const websiteOptions = useGetWebsiteOptions();

  return (
    <header className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/">
          {websiteOptions.textOrImageLogo ? (
            <h1 className="logo-text">
              {websiteOptions.siteTextLogo}
            </h1>
          ) : (
            <img
              className="logo"
              src={websiteOptions.siteLogo.node.sourceUrl}
              alt={websiteOptions.siteLogo.node.altText}
            />
          )}
        </Link>
        <Menu />
      </div>
    </header>
  );
};

export default Header;