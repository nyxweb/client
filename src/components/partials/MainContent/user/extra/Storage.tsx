import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'uuid/v4';

// Partials
import Loader from 'components/partials/Loader';

// Reusables
import Warehouse from 'components/reusables/user/Warehouse';
import Modal from 'components/reusables/Modal';
import Item from 'components/reusables/particles/items/Item';
import Resource from 'components/reusables/particles/Resource';

// Types
import AppState from 'redux/types/app';
import IItem from 'redux/types/items/Item';
import IResource from 'redux/types/reusables/Resource';

export interface DragItem {
  x: number;
  y: number;
  slot: number;
  dragging: boolean;
  from: 'warehouse' | 'storage';
  to: 'warehouse' | 'storage';
}

export interface SellItem {
  slot: number;
  from: string;
  item: IItem;
}

interface Props {}

const Storage: React.FC<Props> = () => {
  const [dragItem, setDragItem] = useState<DragItem>();
  const [open, setOpen] = useState(false);
  const [sellForm, setSellForm] = useState<IResource[]>();
  const [sellItem, setItem] = useState<SellItem>();

  const {
    account,
    extra: { loading }
  } = useSelector((state: AppState) => state.user);
  const config = useSelector((state: AppState) => state.config.resources);

  const resetForm = () => {
    if (config) {
      setSellForm(
        config.map(res => ({
          ...res,
          value: 0
        }))
      );
    }
  };

  const onDecline = () => {
    setOpen(false);
    setSellForm(undefined);
  };

  const sellOnClick = (item: SellItem) => {
    resetForm();
    setItem(item);
    setOpen(true);
  };

  const typer = (e: React.ChangeEvent<HTMLInputElement>, res: IResource) => {
    const updated = [...sellForm];
    const index = updated.findIndex(
      r => r.group === res.group && r.id === res.id && r.level === res.level
    );

    updated[index] = { ...updated[index], value: Number(e.target.value) };

    setSellForm(updated);
  };

  return (
    <div className='Storage'>
      {!account.info || loading ? (
        <Loader />
      ) : (
        <>
          <Warehouse
            type='warehouse'
            items={account.info.warehouse.items}
            locked={account.info.warehouse.lock}
            dragItem={dragItem}
            setDragItem={setDragItem}
            sellOnClick={(item: SellItem) => sellOnClick(item)}
          />
          <Warehouse
            type='storage'
            items={account.info.resources.items}
            locked={false}
            realSize={false}
            slotsX={11}
            slotsY={15}
            dragItem={dragItem}
            setDragItem={setDragItem}
            sellOnClick={(item: SellItem) => sellOnClick(item)}
          />
          <Modal onDecline={onDecline} open={open}>
            <div className='CustomModal sellItem'>
              <div className='title'>Sell item</div>
              <div className='item'>
                <Item item={sellItem?.item} />
              </div>
              <div className='fields'>
                {sellForm?.map(res => (
                  <div className='row' key={uuid()}>
                    <Resource
                      resource={res}
                      style={{ margin: 5, float: 'none' }}
                    />
                    <input
                      type='number'
                      value={res.value}
                      onChange={e => typer(e, res)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Storage;
