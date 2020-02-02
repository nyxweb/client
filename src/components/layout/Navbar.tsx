import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <div className='Navbar'>
      <div className='container'>
        <Link to='/'>News</Link>
        <Link to='/register'>Create Account</Link>
        <Link to='/download'>Download Files</Link>
        <Link to='/rankings'>Players Rankings</Link>
        <Link to='/statistics'>Statistics</Link>
        <a href='http://darksteam.net'>Forums</a>
      </div>
    </div>
  );
};

export default Navbar;
