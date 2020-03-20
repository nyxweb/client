import React from 'react';
import Item from 'components/reusables/particles/items/Item';

interface Props {}

const Auction: React.FC<Props> = () => {
  return (
    <div className='Auction'>
      <Item hex='16fd16ffffffff7f0008af0000000000' />
    </div>
  );
};

export default Auction;
