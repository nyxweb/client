import {
  GET_RANK_CHARACTERS,
  GET_RANK_CHARACTERS_FAILED,
  CLEAR_RANK_CHARACTERS
} from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import Character from 'redux/types/rankings/Character';

const initialState: Character[] | null = null;

const characters = (state = initialState, action: ReduxAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_RANK_CHARACTERS:
      return payload;
    case CLEAR_RANK_CHARACTERS:
      return null;
    case GET_RANK_CHARACTERS_FAILED:
    default:
      return state;
  }
};

export default characters;
