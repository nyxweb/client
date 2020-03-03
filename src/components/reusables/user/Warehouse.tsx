import React, { CSSProperties, useState, useEffect } from 'react';
import uuid from 'uuid';

// Particles
import Item from '../particles/items/Item';

// Helpers
import { decode } from 'helpers/items';

// Config
import list from 'config/items/list.json';

// Actions
import { storage } from 'actions/user/extra';
import { useDispatch } from 'react-redux';

interface Item {
  id: string;
  style: CSSProperties;
  slot: number;
  item: any;
  itemData: any;
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
  /** locked warehouse */
  locked?: boolean;
}

const Warehouse: React.FC<Props> = ({
  items,
  realSize = true,
  slotsX = 8,
  slotsY = 15,
  slotSize = 26,
  locked = false
}) => {
  const [itemsList, setItemsList] = useState<Item[]>();
  const [hexArray, setHexArray] = useState<RegExpMatchArray | null>();
  const [dragItem, setDragItem] = useState<{
    x: number;
    y: number;
    slot: number;
    dragging: boolean;
  }>();
  const [slots, setSlots] = useState<number[][]>();
  const [slotEmpty, setSlotEmpty] = useState(false);
  const [vaultPass, setVaultPass] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    items && setHexArray(items.match(/.{32}/g));
  }, [items]);

  const itemsDB: any = list;

  const containerStyle: CSSProperties = {
    width: slotsX * slotSize + 1,
    height: slotsY * slotSize + 1,
    backgroundSize: slotSize
  };

  useEffect(() => {
    const list: Item[] = [];
    const slots_: number[][] = [];

    if (hexArray) {
      Array(hexArray.length)
        .fill(null)
        .forEach((_, i) => {
          const row = Math.floor(i / 8);
          if (slots_[row]) slots_[row].push(0);
          else slots_[row] = [0];
        });

      hexArray.forEach((hex, i) => {
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
                if (
                  slots_[y + row] !== undefined &&
                  slots_[y + row][x + column] !== undefined
                )
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
              slot: i,
              item,
              itemData
            });
          }
        }
      });

      setSlots(slots_);
      setItemsList(list);
    }
  }, [hexArray, itemsDB, slotSize]);

  useEffect(() => {
    colorSlots({ clear: true });

    if (slots && dragItem) {
      const _slots = [...slots];
      const { x, y, slot: itemSlot, dragging } = dragItem;

      const row = Math.floor(itemSlot / 8);
      const column = Math.floor(itemSlot - row * 8);

      for (let _x = 0; _x < x; _x++) {
        for (let _y = 0; _y < y; _y++) {
          if (_slots[row + _y] && _slots[row + _y][column + _x])
            _slots[row + _y][column + _x] = dragging ? 0 : 1;
        }
      }

      setSlots(_slots);
    }
  }, [dragItem]);

  const isSlotEmpty = ({
    slot,
    x,
    y
  }: {
    slot: number;
    x: number;
    y: number;
  }): void => {
    if (slots) {
      const row = Math.floor(slot / 8);
      const column = Math.floor(slot - row * 8);
      let isEmpty = true;
      const slotsToColor: number[] = [];

      for (let _x = 0; _x < x; _x++) {
        for (let _y = 0; _y < y; _y++) {
          if (column + _x < 8) {
            slotsToColor.push(slot + _x + _y * 8);
          }

          if (
            slots[_y + row] === undefined ||
            slots[_y + row][_x + column] === undefined ||
            slots[_y + row][_x + column] !== 0
          )
            isEmpty = false;
        }
      }

      setSlotEmpty(isEmpty);
      colorSlots({ slots: slotsToColor, empty: isEmpty });
    }
  };

  const colorSlots = ({ slots = [-1], empty = false, clear = false }): void => {
    const slotsArray = document.querySelectorAll('div.empty-slot');

    slotsArray.forEach((slot: any) => {
      if (clear) slot.style.background = 'transparent';
      else {
        const slotId = Number(slot.dataset.slot);

        if (slots.includes(slotId))
          slot.style.background = empty
            ? 'rgba(19, 149, 58, 0.171)'
            : 'rgba(255, 0, 0, 0.171)';
        else slot.style.background = 'transparent';
      }
    });
  };

  // EventListeners
  const onItemDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const slot = target.dataset.slot;

    if (dragItem && slotEmpty) {
      dispatch(
        storage.moveItem({ itemSlot: dragItem.slot, newSlot: Number(slot) })
      );
    }
  };

  return (
    <div className='Warehouse'>
      <div className='content' style={containerStyle}>
        {locked && (
          <div className='locked'>
            <div className='fields'>
              <input
                type='password'
                value={vaultPass}
                placeholder='Vault Password'
                onChange={e => setVaultPass(e.target.value)}
              />
              <button
                onClick={() => dispatch(storage.unlockWarehouse(vaultPass))}
              >
                unlock
              </button>
            </div>
          </div>
        )}
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
                onDragEnter={() => {
                  if (dragItem)
                    isSlotEmpty({ slot: i, x: dragItem.x, y: dragItem.y });
                }}
                onDrop={onItemDrop}
              />
            ))}
        {itemsList &&
          itemsList.map(({ id, style, slot, item, itemData }, i: number) => (
            <Item
              key={i}
              slotSize={slotSize}
              realSize={realSize}
              style={style}
              id={id}
              setDragItem={setDragItem}
              slot={slot}
              item={item}
              itemData={itemData}
            />
          ))}
      </div>
    </div>
  );
};

export default Warehouse;
