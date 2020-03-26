import {
  GET_RANK_CHARACTERS,
  GET_RANK_CHARACTERS_FAILED,
  CLEAR_RANK_CHARACTERS,
  RANKINGS_LOADING
} from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import Character from 'redux/types/rankings/Character';

interface ICharacters {
  loading: boolean;
  list: Character[] | null | false;
  count: number | null;
}

const initialState: ICharacters = {
  loading: false,
  list: null,
  count: null
};

const characters = (state = initialState, { type, payload }: ReduxAction) => {
  switch (type) {
    case RANKINGS_LOADING:
      return {
        ...state,
        loading: payload
      };
    case GET_RANK_CHARACTERS:
      return {
        ...state,
        ...payload
      };
    case CLEAR_RANK_CHARACTERS:
      return initialState;
    case GET_RANK_CHARACTERS_FAILED:
      return {
        ...state,
        list: false,
        count: null
      };
    default:
      return state;
  }
};

export default characters;
