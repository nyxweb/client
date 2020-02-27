import {
  SET_ACCOUNT_LOADER,
  LOGIN,
  LOGIN_FAILED,
  LOGOUT
} from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import AccountState from 'redux/types/user/AccountState';

const initialState: AccountState = {
  loading: false,
  info: null,
  logs: null,
  online: null,
  vip: null
};

const account = (state = initialState, { type, payload }: ReduxAction) => {
  switch (type) {
    case SET_ACCOUNT_LOADER:
      return {
        ...state,
        loading: payload
      };
    case LOGIN:
      return {
        ...state,
        info: payload
      };
    case LOGOUT:
      return initialState;
    case LOGIN_FAILED:
    default:
      return state;
  }
};

export default account;
