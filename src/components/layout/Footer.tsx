import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className='Footer'>
      <div
        className='scroll-up'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
      <div className='copyright'>
        <span>MuOnline Server</span>
        <span>NyxWeb by Dea7h</span>
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
