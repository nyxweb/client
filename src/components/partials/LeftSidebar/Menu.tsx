import React from 'react';
import { Link } from 'react-router-dom';

// Partials
import BlockLight from 'components/partials/BlockLight';

interface Props {}

const Menu: React.FC<Props> = () => {
  return (
    <BlockLight title='main navigator' desc='quick access menu'>
      <Link className='menu-link' to='/'>
        Home
      </Link>
      <Link className='menu-link' to='/'>
        Register
      </Link>
      <Link className='menu-link' to='/'>
        Download
      </Link>
      <Link className='menu-link' to='/'>
        Rankings
      </Link>
      <Link className='menu-link' to='/'>
        WebShop
      </Link>
      <Link className='menu-link' to='/'>
        Forums
      </Link>
    </BlockLight>
  );
};

export default Menu;
