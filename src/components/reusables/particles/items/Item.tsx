import React, { CSSProperties, useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid/v4';

// Reusables
import Options from 'components/reusables/particles/items/Options';

// Helpers
import { decode } from 'helpers/items';

// Config
import list from 'config/items/list.json';
import IItem from 'redux/types/items/Item';
import { DragItem } from 'components/partials/MainContent/user/extra/Storage';

interface Props {
  id?: string;
  /** item hex */
  hex?: string;
  /** show image or item name */
  image?: boolean;
  /** each slot size */
  slotSize?: number;
  /** real items size or one slot */
  realSize?: boolean;

  /** item styles */
  style?: CSSProperties;

  /** for settings the item that is being dragged */
  setDragItem?: (item: DragItem) => void;

  /** item being dragged */
  dragItem?: DragItem;

  /** where the item is from */
  from?: 'warehouse' | 'storage';

  /** Slot the item sits on (for warehouse etc.) */
  slot?: number;

  item?: IItem;

  itemData?: any;
}

const Item: React.FC<Props> = ({
  id = uuid(),
  hex = '',
  image = true,
  slotSize = 26,
  realSize = true,
  style = {},
  setDragItem,
  dragItem,
  from,
  slot,
  item,
  itemData: _itemData
}) => {
  const [isDragged, setIsDragged] = useState(false);
  const [preview, setPreview] = useState<HTMLImageElement>();
  const itemsList: any = list;

  const itemDecode = item || decode(hex);

  const itemImage =
    itemDecode && `/images/items/${itemDecode.group}/${itemDecode.id}.gif`;

  const itemData =
    _itemData ||
    (itemDecode &&
    itemsList[itemDecode.group] &&
    itemsList[itemDecode.group].items[itemDecode.id]
      ? itemsList[itemDecode.group].items[itemDecode.id]
      : false);

  const itemStyle: CSSProperties = {
    width: realSize ? slotSize * itemData.x : slotSize,
    height: realSize ? slotSize * itemData.y : slotSize
  };

  // Event Listeners
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setDragImage(preview!, 0, 0);
  };

  const onDrag = () => {
    if (!isDragged && setDragItem) {
      setIsDragged(true);
      setDragItem({
        ...dragItem!,
        x: itemData.x,
        y: itemData.y,
        slot: slot!,
        dragging: true,
        from: from!
      });
    }
  };

  const onDragEnd = () => {
    if (setDragItem) {
      setIsDragged(false);
      setDragItem({
        ...dragItem!,
        x: itemData.x,
        y: itemData.y,
        slot: slot!,
        dragging: false,
        from: from!
      });
    }
  };

  useEffect(() => {
    if (itemImage) {
      const image = new Image();
      image.src = itemImage;
      image.onload = () => setPreview(image);
    }
  }, [itemImage]);

  return (
    itemDecode &&
    itemData && (
      <div
        className={`Item ${isDragged ? 'dragged' : ''}`}
        style={{ ...itemStyle, ...style }}
        data-tip
        data-for={id}
        onMouseDown={() => ReactTooltip.hide()}
        draggable={!!setDragItem}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        {image ? (
          <div
            style={{
              background: `url('${itemImage}') no-repeat center center/contain`
            }}
            className='item-image'
          />
        ) : (
          itemData.name
        )}
        <ReactTooltip effect='solid' place='left' offset={{ left: 10 }} id={id}>
          <Options item={itemDecode} itemData={itemData} image={!image} />
        </ReactTooltip>
      </div>
    )
  );
};

export default Item;
