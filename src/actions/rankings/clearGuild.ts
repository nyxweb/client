// Types
import { CLEAR_CHARACTER } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const clearCharacter: ActionCreator<ThunkAction<
  void,
  AppState,
  any,
  Action
>> = () => dispatch => {
  dispatch({ type: CLEAR_CHARACTER });
};

export default clearCharacter;
