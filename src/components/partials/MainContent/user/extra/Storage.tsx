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

  const account = useSelector((state: AppState) => state.user.account);

  // const items =
  //   '16EF8D00058B7F7F00000000000000001D6F7C00058B777F00800000000000001D6F8900058B7A7F00B81D00000000001500460005973D0005D0000000000000';

  return (
    <div className='Storage'>
      {!account.info ? (
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
