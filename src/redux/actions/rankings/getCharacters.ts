import axios from 'axios';

// Types
import {
  GET_RANK_CHARACTERS,
  GET_RANK_CHARACTERS_FAILED
} from 'redux/types/actions';
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
      process.env.REACT_APP_API_URI + '/characters'
    );

    dispatch({
      type: data ? GET_RANK_CHARACTERS : GET_RANK_CHARACTERS_FAILED,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_RANK_CHARACTERS_FAILED
    });
  }
};

export default getCharacters;
