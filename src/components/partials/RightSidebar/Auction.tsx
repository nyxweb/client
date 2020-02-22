import React from 'react';

const items = require.context('../../../assets/images/items', true);

interface Props {}

const Auction: React.FC<Props> = () => {
  return (
    <div className='Auction'>
      <div className='item'>
        <img src={items('./12/4.gif')} alt='item' />
      </div>
    </div>
  );
};

export default Auction;
