import axios from 'axios';

// Types
import { SET_CHARACTER_LOADING, GET_CHARACTER } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const getCharacters: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = (name: string) => async dispatch => {
  dispatch({ type: SET_CHARACTER_LOADING, payload: true });

  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URI + `/characters/${name}`
    );

    dispatch({ type: GET_CHARACTER, payload: data });
  } catch (error) {
    dispatch({ type: GET_CHARACTER, payload: false });
  }

  dispatch({ type: SET_CHARACTER_LOADING, payload: false });
};

export default getCharacters;
