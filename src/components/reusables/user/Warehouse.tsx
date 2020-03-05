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

// Types
import { DragItem } from 'components/partials/MainContent/user/extra/Storage';

interface Item {
  id: string;
  style: CSSProperties;
  slot: number;
  item: any;
  itemData: any;
}

interface Props {
  /** the type of the warehouse */
  type?: 'warehouse' | 'storage';
  /** items hex string */
  items?: string;
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

  dragItem?: DragItem;
  setDragItem?: (item: DragItem) => void;
}

const Warehouse: React.FC<Props> = ({
  type,
  items,
  realSize = true,
  slotsX = 8,
  slotsY = 15,
  slotSize = 26,
  locked = false,
  dragItem,
  setDragItem
}) => {
  const [itemsList, setItemsList] = useState<Item[]>();
  const [hexArray, setHexArray] = useState<RegExpMatchArray | null>();
  const [slots, setSlots] = useState<number[][]>();
  const [slotEmpty, setSlotEmpty] = useState(false);
  const [vaultPass, setVaultPass] = useState('');
  const [emptySlots, setEmptySlots] = useState<{
    warehouse: NodeListOf<Element>;
    storage: NodeListOf<Element>;
  }>();

  const dispatch = useDispatch();

  useEffect(() => {
    items && setHexArray(items.match(/.{32}/g));
  }, [items]);

  const itemsDB: any = list;

  const containerStyle: CSSProperties = {
    width: slotsX * slotSize + 2,
    height: slotsY * slotSize + 2,
    backgroundSize: slotSize
  };

  if (
    dragItem &&
    dragItem.dragging &&
    ((dragItem.to === 'warehouse' && type === 'warehouse') ||
      (dragItem.to === 'storage' && type === 'storage'))
  ) {
    containerStyle.border = '1px dashed red';
  }

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

    if (!hexArray) setSlots([]);
  }, [hexArray, itemsDB, slotSize]);

  useEffect(() => {
    clearSlots();

    if (slots && dragItem && type !== 'storage') {
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
  }, [dragItem?.dragging, dragItem?.to]);

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
      if (dragItem?.to === 'warehouse') {
        colorSlots({ slots: slotsToColor, empty: isEmpty });
      }
    }
  };

  const clearSlots = () => {
    emptySlots?.warehouse.forEach((slot: any) => {
      slot.style.background = 'transparent';
    });
  };

  const colorSlots = ({ slots = [-1], empty = false }): void => {
    clearSlots();

    emptySlots?.warehouse.forEach((slot: any) => {
      const slotId = Number(slot.dataset.slot);

      if (slots.includes(slotId))
        slot.style.background = empty
          ? 'rgba(19, 149, 58, 0.171)'
          : 'rgba(255, 0, 0, 0.171)';
      else slot.style.background = 'transparent';
    });
  };

  useEffect(() => {
    setEmptySlots({
      warehouse: document.querySelectorAll('.warehouse-empty-slot'),
      storage: document.querySelectorAll('.storage-empty-slot')
    });
  }, []);

  // EventListeners
  const onItemDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const slot = target.dataset.slot;

    if ((dragItem && slotEmpty) || (dragItem && dragItem.to === 'storage')) {
      dispatch(
        storage.moveItem({
          itemSlot: dragItem.slot,
          newSlot: Number(slot),
          from: dragItem.from,
          to: dragItem.to
        })
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
        {Array(realSize && hexArray ? hexArray.length : slotsX * slotsY)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className={type + '-empty-slot'}
              style={{ width: slotSize, height: slotSize }}
              data-slot={i}
              onDragOver={e => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onDragEnter={() => {
                if (dragItem && setDragItem) {
                  isSlotEmpty({ slot: i, x: dragItem.x, y: dragItem.y });
                  setDragItem({
                    ...dragItem,
                    to: type!
                  });
                }
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
              dragItem={dragItem}
              from={type}
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
