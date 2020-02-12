import axios from 'axios';

// Types
import { CONFIG_EVENTS, CONFIG_EVENTS_FAILED } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const getCharacters: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = () => async dispatch => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URI + '/config/events'
    );

    dispatch({
      type: data ? CONFIG_EVENTS : CONFIG_EVENTS_FAILED,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CONFIG_EVENTS_FAILED
    });
  }
};

export default getCharacters;
