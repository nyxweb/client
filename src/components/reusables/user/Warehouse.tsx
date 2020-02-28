import React, { CSSProperties, useState, useEffect } from 'react';
import uuid from 'uuid';

// Particles
import Item from '../particles/items/Item';

// Helpers
import { decode } from 'helpers/items';

// Config
import list from 'config/items/list.json';

interface Item {
  hex: string;
  id: string;
  style: CSSProperties;
}

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
  slotSize?: number;
}

const Warehouse: React.FC<Props> = ({
  items,
  realSize = true,
  slotsX = 8,
  slotsY = 15,
  slotSize = 26
}) => {
  const [itemsList, setItemsList] = useState<Item[]>();
  const [hexArray] = useState(items.match(/.{32}/g));
  const [dragItem, setDragItem] = useState();
  const [slots, setSlots] = useState();

  const itemsDB: any = list;

  const containerStyle: CSSProperties = {
    width: slotsX * slotSize + 1,
    height: slotsY * slotSize + 1,
    backgroundSize: slotSize
  };

  useEffect(() => {
    const list: Item[] = [];

    const slots_: number[][] = [];
    Array(hexArray!.length)
      .fill(null)
      .forEach((_, i) => {
        const row = Math.floor(i / 8);
        if (slots_[row]) slots_[row].push(0);
        else slots_[row] = [0];
      });

    hexArray!.forEach((hex, i) => {
      const row = Math.floor(i / 8);
      const column = Math.floor(i - row * 8);

      if (hex.toLowerCase() !== 'f'.repeat(32)) {
        const item = decode(hex);
        const itemData =
          item && itemsDB[item.group] && itemsDB[item.group].items[item.id]
            ? itemsDB[item.group].items[item.id]
            : false;

        if (itemData) {
          for (let x = 0; x < itemData.x; x++) {
            for (let y = 0; y < itemData.y; y++) {
              slots_[y + row][x + column] = 1;
            }
          }

          // Item style
          const style: CSSProperties = {
            position: 'absolute',
            top: row * slotSize,
            left: column * slotSize,
            background: 'rgba(0,0,0,0.3)'
          };

          list.push({
            id: uuid.v4(),
            style,
            hex
          });
        }
      }
    });

    console.log(slots_);
    setSlots(slots_);

    setItemsList(list);
  }, [hexArray]);

  const isSlotEmpty = ({
    slot,
    x,
    y
  }: {
    slot: number;
    x: number;
    y: number;
  }) => {
    for (let _x = 0; _x < x; _x++) {
      for (let _y = 0; _y < y; _y++) {
        slots[y + _y][x + _x] = 1;
      }
    }
  };

  return (
    <div className='Warehouse'>
      <div className='content' style={containerStyle}>
        {hexArray &&
          realSize &&
          Array(hexArray.length)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className='empty-slot'
                style={{ width: slotSize, height: slotSize }}
                data-slot={i}
                onDragOver={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onDragEnter={(e: React.DragEvent) => {
                  const target: any = e.target;
                  const slot = target.dataset.slot;
                  const x = target.dataset.x;
                  const y = target.dataset.y;

                  // target.style.background = 'red';
                  isSlotEmpty({ slot, x, y });
                }}
                onDrop={e => {
                  console.log('drop', dragItem);
                }}
              />
            ))}
        {itemsList &&
          itemsList.map(({ hex, id, style }, i: number) => (
            <Item
              hex={hex}
              key={i}
              slotSize={slotSize}
              realSize={realSize}
              style={style}
              id={id}
              setDragItem={setDragItem}
            />
          ))}
      </div>
    </div>
  );
};

export default Warehouse;
