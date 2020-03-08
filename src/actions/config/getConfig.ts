import axios from 'axios';

// Actions
import { notice } from 'actions/utils';

// Types
import { SET_CONFIG } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const getConfig: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = () => async dispatch => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API_URI + '/config');

    dispatch({
      type: SET_CONFIG,
      payload: data
    });
  } catch (error) {
    notice(error);
  }
};

export default getConfig;
