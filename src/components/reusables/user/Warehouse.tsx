import React, { CSSProperties } from 'react';

// Particles
import Item from '../particles/items/Item';

interface Props {
  /** items hex string */
  items: string;
  /** wether or not items should take only one slot or real size */
  realSize?: boolean;
  /** slots per row horizontally */
  slotsX?: number;
  /** slots per row vertically */
  slotsY?: number;
  /** each slot size */
  slot?: number;
}

const Warehouse: React.FC<Props> = ({
  items,
  realSize = true,
  slotsX = 8,
  slotsY = 15,
  slot = 26
}) => {
  const style: CSSProperties = {};

  // Slots per row/column
  style.width = slotsX * slot + 1;
  style.height = slotsY * slot + 1;

  // Slots size
  style.backgroundSize = slot;

  // Items
  const itemsArray = items.match(/.{32}/g);

  return (
    <div className='Warehouse'>
      <div className='content' style={style}>
        {itemsArray?.map((item: string, i: number) => {
          const row = Math.floor(i / 8);
          const column = Math.floor(i - row * 8);

          // Item style
          const itemStyle: CSSProperties = {};
          itemStyle.position = 'absolute';
          itemStyle.top = row * slot;
          itemStyle.left = column * slot;
          itemStyle.background = 'rgba(0,0,0,0.3)';

          return (
            <Item
              hex={item}
              key={i}
              size={slot}
              realSize={realSize}
              style={itemStyle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Warehouse;
