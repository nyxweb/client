import React from 'react';

import logo from 'assets/images/logo.png';

interface Props {
  active?: boolean;
  styles?: 'light' | 'dark';
}

const Loader: React.FC<Props> = ({ active = true, styles = 'light' }) => {
  return (
    <div className={`Loader ${styles} ${active ? 'active' : ''}`}>
      <img className='logo' src={logo} alt='mu logo' />
      <div className='container'>
        <div className={`fill ${styles}`} />
      </div>
    </div>
  );
};

export default Loader;
