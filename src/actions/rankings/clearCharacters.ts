// Types
import { CLEAR_RANK_CHARACTERS } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const clearCharacters: ActionCreator<ThunkAction<
  void,
  AppState,
  any,
  Action
>> = () => dispatch => {
  dispatch({
    type: CLEAR_RANK_CHARACTERS
  });
};

export default clearCharacters;
