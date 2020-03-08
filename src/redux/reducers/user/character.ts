import { SET_CHARACTER_LOADER } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import CharacterState from 'redux/types/user/CharacterState';

const initialState: CharacterState = {
  loading: false,
  class: null,
  name: null,
  reset: null,
  stats: null
};

const character = (state = initialState, { type, payload }: ReduxAction) => {
  switch (type) {
    case SET_CHARACTER_LOADER:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

export default character;
