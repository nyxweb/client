import { GET_TOP_PLAYERS, GET_TOP_PLAYERS_FAILED } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import Characters from 'redux/types/Characters';

const initialState: Characters = {
  topCharacters: null
};

const login = (state = initialState, action: ReduxAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TOP_PLAYERS:
      return {
        ...state,
        topCharacters: payload
      };
    case GET_TOP_PLAYERS_FAILED:
    default:
      return state;
  }
};

export default login;
