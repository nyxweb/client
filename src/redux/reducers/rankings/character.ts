import { SET_CHARACTER_LOADING, GET_CHARACTER } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import Character from 'redux/types/rankings/Character';

interface ICharacter {
  loading: boolean;
  char: Character | null | false;
}

const initialState: ICharacter = {
  loading: false,
  char: null
};

const characters = (state = initialState, { type, payload }: ReduxAction) => {
  switch (type) {
    case SET_CHARACTER_LOADING:
      return {
        ...state,
        loading: payload
      };
    case GET_CHARACTER:
      return {
        ...state,
        char: payload
      };
    default:
      return state;
  }
};

export default characters;
