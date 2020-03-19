import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Partials
import Loader from 'components/partials/Loader';

// Reusablesn
import Warehouse from 'components/reusables/user/Warehouse';

// Types
import AppState from 'redux/types/app';

export interface DragItem {
  x: number;
  y: number;
  slot: number;
  dragging: boolean;
  from: 'warehouse' | 'storage';
  to: 'warehouse' | 'storage';
}

interface Props {}

const Storage: React.FC<Props> = () => {
  const [dragItem, setDragItem] = useState<DragItem>();

  const {
    account,
    extra: { loading }
  } = useSelector((state: AppState) => state.user);

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
          />
        </>
      )}
    </div>
  );
};

export default Storage;
