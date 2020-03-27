import React from 'react';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className='Header'>
      <div className='smog'>
        <div className='x1' />
        <div className='x2' />
        <div className='x3' />
      </div>
    </header>
  );
};

export default Header;
