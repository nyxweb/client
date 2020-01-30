import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <div className='Navbar'>
      <div className='container'>
        <Link to='/'>Home</Link>
        <Link to='/'>Home</Link>
        <Link to='/'>Home</Link>
        <Link to='/'>Home</Link>
        <Link to='/'>Home</Link>
        <Link to='/'>Home</Link>
        <Link to='/'>Home</Link>
      </div>
    </div>
  );
};

export default Navbar;
