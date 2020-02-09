import React from 'react';
import { Link } from 'react-router-dom';

// Partials
import ContentBlock from 'components/partials/LeftSidebar/ContentBlock';

interface Props {}

const Menu: React.FC<Props> = () => {
  return (
    <ContentBlock title='main navigator' desc='quick access menu'>
      <Link className='menu-link' to='/'>
        Server News
      </Link>
      <Link className='menu-link' to='/register'>
        Create Account
      </Link>
      <Link className='menu-link' to='/download'>
        Game Files
      </Link>
      <Link className='menu-link' to='/rankings'>
        Rankings
      </Link>
      <Link className='menu-link' to='/'>
        WebShop
      </Link>
      <a
        className='menu-link'
        href='http://darksteam.net'
        target='_blank'
        rel='noopener noreferrer'
      >
        Forums
      </a>
    </ContentBlock>
  );
};

export default Menu;
