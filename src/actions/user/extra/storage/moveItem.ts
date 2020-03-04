import axios from 'axios';

// Actions
import { notice } from 'actions/utils';

// Types
import { WAREHOUSE_UPDATE, STORAGE_UPDATE } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import store from 'redux/store';

const moveItem: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = ({ itemSlot, newSlot, from, to }) => async dispatch => {
  try {
    const removeItem = (
      items: string,
      slot: number,
      replace: string = ''
    ): string =>
      items.slice(0, slot * 32) + replace + items.slice((slot + 1) * 32);

    const {
      warehouse: { items: warehouse },
      resources: { items: storage }
    } = store.getState().user.account.info;

    const oldItem = (from === 'warehouse' ? warehouse : storage).substr(
      itemSlot * 32,
      32
    );

    // let newWarehouse = warehouse;
    // let newStorage = storage;
    // if(from === 'warehouse' && to === 'warehouse') {
    //   newWarehouse = warehouse.split('').splice(itemSlot * 32, 32, replace)
    // }

    let newWarehouse;
    if (from === 'warehouse')
      newWarehouse = warehouse.replace(oldItem, 'f'.repeat(32));
    else {
      newWarehouse =
        warehouse.slice(0, newSlot * 32) +
        oldItem +
        warehouse.slice((newSlot + 1) * 32);
    }

    const newStorage =
      from === 'warehouse' ? storage + oldItem : storage.replace(oldItem, '');

    dispatch({
      type: WAREHOUSE_UPDATE,
      payload: newWarehouse
    });

    dispatch({
      type: STORAGE_UPDATE,
      payload: newStorage
    });

    // await axios.patch(
    //   process.env.REACT_APP_API_URI + '/user/extra/storage/moveitem',
    //   {
    //     itemSlot,
    //     newSlot,
    //     area
    //   }
    // );
  } catch (error) {
    console.log(error.message);
    notice(error);
  }
};

export default moveItem;
