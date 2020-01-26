import { ADMIN_LOGIN, ADMIN_LOGOUT } from 'redux/types';
import ReduxAction from 'interfaces/redux/Action';

const initialState = {
  logged: false
};

const admin = (state = initialState, action: ReduxAction) => {
  const { type } = action;

  switch (type) {
    case ADMIN_LOGIN:
      return {
        ...state,
        logged: true
      };
    case ADMIN_LOGOUT:
      return {
        ...state,
        logged: false
      };
    default:
      return state;
  }
};

export default admin;
