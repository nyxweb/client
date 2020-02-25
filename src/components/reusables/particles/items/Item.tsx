import React, { CSSProperties } from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid/v4';

// Reusables
import Options from 'components/reusables/particles/items/Options';

// Helpers
import { decode } from 'helpers/items';

// Config
import list from 'config/items/list.json';

const getImage = require.context('../../../../assets/images/items/', true);

// Types
// import IItems from 'redux/types/items/List';

interface Props {
  /** item hex */
  hex: string;
  /** show image or item name */
  image?: boolean;
  /** item size per slot */
  size?: number;
  /** real items size or one slot */
  realSize?: boolean;

  /** item styles */
  style?: CSSProperties;
}

const Item: React.FC<Props> = ({
  hex,
  image = true,
  size = 26,
  realSize = true,
  style = {}
}) => {
  const itemsList: any = list;

  const getItemImage = (name: string) => {
    try {
      return getImage(name);
    } catch (error) {
      return getImage('./unknown.png');
    }
  };

  const id = uuid();
  const item = decode(hex);
  const itemData =
    item && itemsList[item.group] && itemsList[item.group].items[item.id]
      ? itemsList[item.group].items[item.id]
      : false;

  // Size
  const itemStyle: CSSProperties = {};
  itemStyle.width = realSize ? size * itemData.x : size;
  itemStyle.height = realSize ? size * itemData.y : size;

  return (
    item &&
    itemData && (
      <div
        className='Item'
        style={{ ...itemStyle, ...style }}
        data-tip
        data-for={id}
      >
        {image ? (
          <img
            src={getItemImage(`./${item.group}/${item.id}.gif`)}
            alt={itemData.name}
            className='item-image'
          />
        ) : (
          itemData.name
        )}
        <ReactTooltip effect='solid' place='left' offset={{ left: 10 }} id={id}>
          <Options item={item} itemData={itemData} image={!image} />
        </ReactTooltip>
      </div>
    )
  );
};

export default Item;
