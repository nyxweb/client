import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Status: React.FC<Props> = () => {
  return (
    <div className='Status'>
      <div className='image online' />
      <div className='info'>
        <div className='top'>
          <span>NyxWeb</span>
          <span>
            Online <span className='count'>178</span>
          </span>
        </div>
        <div className='progress'>
          <div className='loader' style={{ width: 50 + '%' }}></div>
        </div>
        <Link to='/server-info'>Server Information</Link>
      </div>
    </div>
  );
};

export default Status;
