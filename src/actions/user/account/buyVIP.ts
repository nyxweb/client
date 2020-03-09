import axios from 'axios';

// Types
import {
  SET_ACCOUNT_INFO,
  SET_CREDITS,
  SET_ACCOUNT_LOADER
} from 'redux/types/actions';

// Redux
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

// Actions
import { notice } from 'actions/utils';

const buyVIP: ActionCreator<ThunkAction<void, AppState, any, Action>> = (
  vipDays: number
) => async dispatch => {
  dispatch({
    type: SET_ACCOUNT_LOADER,
    payload: true
  });

  try {
    const { data } = await axios.patch(
      process.env.REACT_APP_API_URI + '/user/account/vip',
      {
        vipDays
      }
    );

    dispatch({
      type: SET_ACCOUNT_INFO,
      payload: data.info
    });

    dispatch({
      type: SET_CREDITS,
      payload: data.credits
    });

    notice(data);
  } catch (error) {
    notice(error);
  }

  dispatch({
    type: SET_ACCOUNT_LOADER,
    payload: false
  });
};

export default buyVIP;
