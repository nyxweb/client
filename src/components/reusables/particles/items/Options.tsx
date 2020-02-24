import React from 'react';

// Helpers
import { name } from 'helpers/items';

// Types
import Item from 'redux/types/items/Item';

const getImage = require.context('../../../../assets/images/items/', true);

interface Props {
  item: Item;
  image?: boolean;
}

const Options: React.FC<Props> = ({ item, image = false }) => {
  const getItemImage = (name: string) => {
    try {
      return getImage(name);
    } catch (error) {
      return getImage('./unknown.png');
    }
  };

  return (
    <div className='Options'>
      <div className='row name' style={name(item)}>
        Kundun Staff + 13
      </div>
      {image ?? (
        <img src={getItemImage(`./${item.group}/${item.id}.gif`)} alt='item' />
      )}
    </div>
  );
};

export default Options;
