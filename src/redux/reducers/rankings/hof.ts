import { GET_HOF, GET_HOF_FAILED } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import Character from 'redux/types/rankings/Character';

const initialState: Character[] | null = null;

const hof = (state = initialState, action: ReduxAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_HOF:
      return payload;
    case GET_HOF_FAILED:
      return false;
    default:
      return state;
  }
};

export default hof;
