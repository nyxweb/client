import {
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGOUT
} from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import UserState from 'redux/types/user/User';

const initialState: UserState = {
  memb___id: null,
  memb_name: null,
  sno__numb: null,
  mail_addr: null,
  bloc_code: null,
  ctl1_code: null,
  IsVip: null,
  VipExpirationTime: null,
  reg_ip: null,
  jwt_token: null,
  admin_lvl: null,
  resources: null
};

const user = (state = initialState, action: ReduxAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN:
      return payload;
    case USER_LOGOUT:
      return initialState;
    case USER_LOGIN_FAILED:
    default:
      return state;
  }
};

export default user;
