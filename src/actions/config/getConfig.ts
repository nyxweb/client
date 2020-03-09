import axios from 'axios';

// Types
import { SET_CONFIG, SET_CONFIG_FAILED } from 'redux/types/actions';
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
    dispatch({
      type: SET_CONFIG_FAILED
    });
  }
};

export default getConfig;
