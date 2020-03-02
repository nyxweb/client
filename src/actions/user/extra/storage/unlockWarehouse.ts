// import axios from 'axios';

// Actions
import { notice } from 'actions/utils';

// Types
import { WAREHOUSE_UNLOCK } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const unlockWarehouse: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = password => async dispatch => {
  try {
    dispatch({
      type: WAREHOUSE_UNLOCK
    });
  } catch (error) {
    notice(error);
  }
};

export default unlockWarehouse;
