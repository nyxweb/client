import React from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid/v4';

// Reusables
import Options from 'components/reusables/particles/items/Options';

// Helpers
import { decode } from 'helpers/items';

// Config
// import list from 'config/items/list.json';

const getImage = require.context('../../../../assets/images/items/', true);

interface Props {
  hex: string;
  image?: boolean;
}

const Item: React.FC<Props> = ({ hex, image = true }) => {
  const getItemImage = (name: string) => {
    try {
      return getImage(name);
    } catch (error) {
      return getImage('./unknown.png');
    }
  };

  const id = uuid();
  const item = decode(hex);

  return item ? (
    <div className='Item' data-tip data-for={id}>
      {image ? (
        <img src={getItemImage(`./${item.group}/${item.id}.gif`)} alt='item' />
      ) : (
        'name of the item'
      )}
      <ReactTooltip effect='solid' place='left' offset={{ left: 10 }} id={id}>
        <Options item={item} />
      </ReactTooltip>
    </div>
  ) : (
    <div>error</div>
  );
};

export default Item;
