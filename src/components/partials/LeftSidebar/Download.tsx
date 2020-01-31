import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Download: React.FC<Props> = () => {
  return (
    <div className='Download'>
      <Link to='/downloads'>
        <span>Download</span>and start playing...
      </Link>
    </div>
  );
};

export default Download;
