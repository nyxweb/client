import axios from 'axios';

// Types
import { SET_CHARACTERS, SET_CHARACTER_LOADER } from 'redux/types/actions';

// Redux
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const getChars: ActionCreator<ThunkAction<
  void,
  AppState,
  any,
  Action
>> = () => async dispatch => {
  dispatch({ type: SET_CHARACTER_LOADER, payload: true });

  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URI + '/user/character'
    );

    dispatch({ type: SET_CHARACTERS, payload: data });
  } catch (error) {}

  dispatch({ type: SET_CHARACTER_LOADER, payload: false });
};

export default getChars;
