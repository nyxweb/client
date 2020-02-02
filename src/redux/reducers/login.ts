import {
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGOUT
} from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import LoginState from 'redux/types/Login';

const initialState: LoginState = {
  username: localStorage.nyxLogin || null,
  token: localStorage.nyxToken || null
};

const login = (state = initialState, action: ReduxAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        username: payload.username,
        token: payload.token
      };
    case USER_LOGOUT:
      return {
        ...state,
        username: null,
        token: null
      };
    case USER_LOGIN_FAILED:
    default:
      return state;
  }
};

export default login;
