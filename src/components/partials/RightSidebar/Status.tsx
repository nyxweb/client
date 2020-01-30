import React from 'react';

interface Props {}

const Status: React.FC<Props> = () => {
  return (
    <div className='Status'>
      <div className='image offline' />
      <div className='info'>
        <span>Total Accounts: 3423</span>
        <span>Total Characters: 4423</span>
      </div>
    </div>
  );
};

export default Status;
