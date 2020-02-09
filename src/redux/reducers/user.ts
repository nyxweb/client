import {
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGOUT
} from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import UserState from 'redux/types/User';

const initialState: UserState = {
  username: null,
  reg_time: null,
  reg_ip: null,
  vip: null,
  vip_exp: null
};

const user = (state = initialState, action: ReduxAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN:
      return payload;
    case USER_LOGOUT:
      return {
        username: null,
        reg_time: null,
        reg_ip: null
      };
    case USER_LOGIN_FAILED:
    default:
      return state;
  }
};

export default user;
