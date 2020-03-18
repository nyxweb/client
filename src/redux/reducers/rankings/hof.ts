import { GET_HOF, GET_HOF_FAILED } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import Character from 'redux/types/rankings/Character';

interface IHof {
  loading: boolean;
  list: Character[] | null | false;
}

const initialState: IHof = {
  loading: false,
  list: null
};

const hof = (state = initialState, { type, payload }: ReduxAction) => {
  switch (type) {
    case GET_HOF:
      return {
        ...state,
        list: payload
      };
    case GET_HOF_FAILED:
      return initialState;
    default:
      return state;
  }
};

export default hof;
