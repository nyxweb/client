import axios from 'axios';

// Types
import { GET_RANK_5GUILDS, GET_RANK_5GUILDS_FAILED } from 'redux/types/actions';
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
      process.env.REACT_APP_API_URI + '/guilds?limit=5'
    );

    dispatch({
      type: data ? GET_RANK_5GUILDS : GET_RANK_5GUILDS_FAILED,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_RANK_5GUILDS_FAILED
    });
  }
};

export default getCharacters;
