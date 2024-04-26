import React from 'react';
import { Link } from 'gatsby';
import useGetMenuItems from '../../graphql/useGetMenuItems';

const Menu = () => {
  const data = useGetMenuItems();

  // Find the "Header Nav" menu
  const headerNav = data && data.find(menu => menu.name === 'Header Nav');

  return (
    <nav className='header-nav'>
      <ul className='menu-items'>
        {headerNav && headerNav.menuItems.edges.map(({ node }) => {
          const url = new URL(node.url);
          const path = url.pathname;

          return (
            <li key={node.id} className='menu-item'>
              <Link to={path}>{node.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;