import React from 'react';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className='Header'>
      <div className='character'></div>
      <div className='game-start'></div>
    </header>
  );
};

export default Header;
