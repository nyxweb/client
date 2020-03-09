import { SET_CHARACTER_LOADER, SET_CHARACTERS } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import CharacterState from 'redux/types/user/CharacterState';

const initialState: CharacterState = {
  loading: false,
  list: null
};

const character = (state = initialState, { type, payload }: ReduxAction) => {
  switch (type) {
    case SET_CHARACTER_LOADER:
      return {
        ...state,
        loading: payload
      };
    case SET_CHARACTERS:
      return {
        ...state,
        list: payload
      };
    default:
      return state;
  }
};

export default character;
