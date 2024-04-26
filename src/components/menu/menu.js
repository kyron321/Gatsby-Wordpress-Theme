import React from 'react';
import { Link } from 'gatsby';
import useGetMenuItems from '../../graphql/useGetMenuItems';

const Menu = () => {
    const data = useGetMenuItems();
    console.log(data);
  };

export default Menu;