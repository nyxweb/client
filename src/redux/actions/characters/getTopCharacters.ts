import axios from 'axios';

// Types
import { GET_TOP_PLAYERS, GET_TOP_PLAYERS_FAILED } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const getTopPlayers: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = () => async dispatch => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URI + '/characters/hof'
    );

    dispatch({
      type: !data.error ? GET_TOP_PLAYERS : GET_TOP_PLAYERS_FAILED,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_TOP_PLAYERS_FAILED
    });
  }
};

export default getTopPlayers;
