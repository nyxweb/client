import React from 'react';

import logo from 'assets/images/logo.png';

interface Props {}

const Loader: React.FC<Props> = () => {
  return (
    <div className='Loader'>
      <img className='logo' src={logo} alt='mu logo' />
      <div className='container'>
        <div className='fill' />
      </div>
    </div>
  );
};

export default Loader;
