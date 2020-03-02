import React from 'react';
import { useSelector } from 'react-redux';

// Partials
import Warehouse from 'components/reusables/user/Warehouse';

// Types
import AppState from 'redux/types/app';

interface Props {}

const Storage: React.FC<Props> = () => {
  const info = useSelector((state: AppState) => state.user.account.info);

  return (
    <div className='Storage'>
      {info ? (
        <Warehouse items={info.warehouse.items} locked={info.warehouse.lock} />
      ) : (
        'loading'
      )}
    </div>
  );
};

export default Storage;
