import axios from 'axios';

// Actions
import { notice } from 'actions/utils';

// Types
import {
  WAREHOUSE_UPDATE,
  STORAGE_UPDATE,
  SET_ACCOUNT_LOADER
} from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const moveItem: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = ({ itemSlot, newSlot, from, to }) => async dispatch => {
  dispatch({
    type: SET_ACCOUNT_LOADER,
    payload: true
  });

  try {
    if (from !== to || (from === to && from !== 'storage')) {
      const { data } = await axios.patch(
        process.env.REACT_APP_API_URI + '/user/extra/storage/moveitem',
        {
          itemSlot,
          newSlot,
          from,
          to
        }
      );

      dispatch({
        type: WAREHOUSE_UPDATE,
        payload: data.warehouse
      });

      dispatch({
        type: STORAGE_UPDATE,
        payload: data.storage
      });
    }
  } catch (error) {
    notice(error);
  }

  dispatch({
    type: SET_ACCOUNT_LOADER,
    payload: false
  });
};

export default moveItem;
