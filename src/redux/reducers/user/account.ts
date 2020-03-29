import {
  SET_LOGIN_LOADER,
  SET_ACCOUNT_LOADER,
  LOGIN,
  LOGIN_FAILED,
  LOGOUT,
  WAREHOUSE_UNLOCK,
  WAREHOUSE_UPDATE,
  RESOURCES_UPDATE,
  STORAGE_UPDATE,
  SET_LOGS,
  CLEAR_LOGS,
  SET_ONLINE,
  SET_CREDITS,
  SET_ACCOUNT_INFO
} from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import AccountState from 'redux/types/user/AccountState';

const initialState: AccountState = {
  loginLoader: false,
  loading: false,
  verified: null,
  info: null,
  logs: {
    list: null,
    count: null
  }
};

const account = (state = initialState, { type, payload }: ReduxAction) => {
  switch (type) {
    case SET_LOGIN_LOADER:
      return {
        ...state,
        loginLoader: payload
      };
    case SET_ACCOUNT_LOADER:
      return {
        ...state,
        loading: payload
      };
    case LOGIN:
      return {
        ...state,
        verified: true,
        info: payload
      };
    case LOGIN_FAILED:
      return {
        ...initialState,
        verified: false
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
    case RESOURCES_UPDATE:
      return {
        ...state,
        info: {
          ...state.info,
          resources: payload
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
    case SET_LOGS:
      return {
        ...state,
        logs: payload
      };
    case CLEAR_LOGS:
      return {
        ...state,
        logs: null
      };
    case SET_ONLINE:
      return {
        ...state,
        info: {
          ...state.info,
          status: payload
        }
      };
    case SET_CREDITS:
      return {
        ...state,
        info: {
          ...state.info,
          resources: {
            ...state.info?.resources,
            credits: payload
          }
        }
      };
    case SET_ACCOUNT_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          ...payload
        }
      };
    case LOGOUT:
      return { ...initialState, verified: false };
    default:
      return state;
  }
};

export default account;
