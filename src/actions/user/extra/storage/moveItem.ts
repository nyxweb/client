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
    const {
      warehouse: { items: warehouse },
      resources: { items: storage }
    } = store.getState().user.account.info;

    const item = (from === 'warehouse' ? warehouse : storage).substr(
      itemSlot * 32,
      32
    );

    let updatedWarehouse = warehouse;
    let updatedStorage = storage;

    if (from === 'warehouse') {
      updatedWarehouse = warehouse.replace(item, 'f'.repeat(32));

      if (to === 'storage') {
        updatedStorage = storage + item;
      } else {
        updatedWarehouse =
          updatedWarehouse.slice(0, newSlot * 32) +
          item +
          updatedWarehouse.slice((newSlot + 1) * 32);
      }
    } else {
      if (to === 'warehouse') {
        updatedWarehouse =
          warehouse.slice(0, newSlot * 32) +
          item +
          warehouse.slice((newSlot + 1) * 32);

        updatedStorage = storage.replace(item, '');
      } else return;
    }

    dispatch({
      type: WAREHOUSE_UPDATE,
      payload: updatedWarehouse
    });

    dispatch({
      type: STORAGE_UPDATE,
      payload: updatedStorage
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
