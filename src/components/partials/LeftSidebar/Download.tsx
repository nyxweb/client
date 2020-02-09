import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Download: React.FC<Props> = () => {
  return (
    <div className='Download'>
      <Link to='/download'>
        <span>Download Now</span>...and start playing right away!
      </Link>
    </div>
  );
};

export default Download;
