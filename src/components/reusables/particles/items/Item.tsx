import React, { CSSProperties, useState, useEffect } from 'react';
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
  id?: string;
  /** item hex */
  hex: string;
  /** show image or item name */
  image?: boolean;
  /** each slot size */
  slotSize?: number;
  /** real items size or one slot */
  realSize?: boolean;

  /** item styles */
  style?: CSSProperties;

  setDragItem?: (dragItem: EventTarget) => void;
}

const Item: React.FC<Props> = ({
  id = uuid(),
  hex,
  image = true,
  slotSize = 26,
  realSize = true,
  style = {},
  setDragItem
}) => {
  const [dragged, setDragged] = useState(false);

  const itemsList: any = list;

  const getItemImage = (name: string) => {
    try {
      return getImage(name);
    } catch (error) {
      return getImage('./unknown.png');
    }
  };

  const item = decode(hex);

  const itemData =
    item && itemsList[item.group] && itemsList[item.group].items[item.id]
      ? itemsList[item.group].items[item.id]
      : false;

  const itemStyle: CSSProperties = {
    width: realSize ? slotSize * itemData.x : slotSize,
    height: realSize ? slotSize * itemData.y : slotSize
  };

  return (
    item &&
    itemData && (
      <div
        className={`Item ${dragged ? 'dragged' : ''}`}
        style={{ ...itemStyle, ...style }}
        data-tip
        data-for={id}
        data-x={itemData.x}
        data-y={itemData.y}
        onMouseDown={() => {
          ReactTooltip.hide();
        }}
        draggable={!!setDragItem}
        onDrag={e => {
          setDragged(true);
          setDragItem && setDragItem(e.target);
        }}
        onDragEnd={() => setDragged(false)}
      >
        {image ? (
          <div
            style={{
              background: `url('${getItemImage(
                `./${item.group}/${item.id}.gif`
              )}') no-repeat center center/contain`
            }}
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
