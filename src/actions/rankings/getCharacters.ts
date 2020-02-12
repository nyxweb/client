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
>> = ({ loader, page }) => async dispatch => {
  loader(true);

  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URI + `/characters?page=${page}`
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

  loader(false);
};

export default getCharacters;
