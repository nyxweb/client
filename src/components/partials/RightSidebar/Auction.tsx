import React from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid/v4';
import Item from 'components/reusables/particles/items/Item';

interface Props {}

const Auction: React.FC<Props> = () => {
  const id = uuid();

  return (
    <div className='Auction'>
      <div className='item'>
        <Item hex='1D6F7C00058B777F0080000000000000' />
      </div>
    </div>
  );
};

export default Auction;
