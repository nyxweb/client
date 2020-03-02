import axios from 'axios';

// Actions
import { notice } from 'actions/utils';

// Types
import { WAREHOUSE_MOVE_ITEM } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import store from 'redux/store';

const moveItem: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = ({ itemSlot, newSlot }) => async dispatch => {
  try {
    const items: string = store.getState().user.account.info.warehouse.items;

    const oldItem = items.substr(itemSlot * 32, 32);

    const remove =
      items.slice(0, itemSlot * 32) +
      'f'.repeat(32) +
      items.slice((itemSlot + 1) * 32);

    const add =
      remove.slice(0, newSlot * 32) +
      oldItem +
      remove.slice((newSlot + 1) * 32);

    dispatch({
      type: WAREHOUSE_MOVE_ITEM,
      payload: add
    });

    await axios.patch(process.env.REACT_APP_API_URI + '/users/auth', {
      itemSlot,
      newSlot
    });
  } catch (error) {
    notice(error);
  }
};

export default moveItem;
