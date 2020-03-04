import {
  SET_ACCOUNT_LOADER,
  LOGIN,
  LOGIN_FAILED,
  LOGOUT,
  WAREHOUSE_UNLOCK,
  WAREHOUSE_UPDATE,
  STORAGE_UPDATE
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
    case WAREHOUSE_UPDATE:
      return {
        ...state,
        info: {
          ...state.info,
          warehouse: {
            ...state.info?.warehouse,
            items: payload
          }
        }
      };
    case STORAGE_UPDATE:
      return {
        ...state,
        info: {
          ...state.info,
          resources: {
            ...state.info?.resources,
            items: payload
          }
        }
      };
    case WAREHOUSE_UNLOCK:
      return {
        ...state,
        info: {
          ...state.info,
          warehouse: {
            ...state.info?.warehouse,
            lock: false
          }
        }
      };
    case LOGOUT:
      return initialState;
    case LOGIN_FAILED:
    default:
      return state;
  }
};

export default account;
