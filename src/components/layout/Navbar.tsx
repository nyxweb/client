import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <div className='Navbar'>
      <div className='container'>
        <Link to='/'>
          News
          <div className='underline'>
            <div className='line' />
          </div>
        </Link>
        <Link to='/register'>
          Create Account
          <div className='underline'>
            <div className='line' />
          </div>
        </Link>
        <Link to='/download'>
          Download Files
          <div className='underline'>
            <div className='line' />
          </div>
        </Link>
        <Link to='/rankings'>
          Players Rankings
          <div className='underline'>
            <div className='line' />
          </div>
        </Link>
        <Link to='/statistics'>
          Statistics
          <div className='underline'>
            <div className='line' />
          </div>
        </Link>
        <a href='http://darksteam.net'>
          Forums
          <div className='underline'>
            <div className='line' />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
