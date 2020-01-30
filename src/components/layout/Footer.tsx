import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className='Footer'>
      <div className='copyright'>
        <span>NyxWeb 2020 by Dea7h</span>
        <span>Design by zebah</span>
      </div>
      <div className='menu'>
        <Link to='/'>Home</Link>
        <Link to='/'>Register</Link>
        <Link to='/'>Downloads</Link>
        <Link to='/'>Rankings</Link>
        <Link to='/'>WebShop</Link>
        <Link to='/'>Statistics</Link>
        <Link to='/'>Forums</Link>
      </div>
    </footer>
  );
};

export default Footer;
