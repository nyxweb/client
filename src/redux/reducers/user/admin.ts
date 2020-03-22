import { SET_ADMIN_LOADER } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import AdminState from 'redux/types/user/AdminState';

const initialState: AdminState = {
  loading: false
};

const admin = (state = initialState, { type, payload }: ReduxAction) => {
  switch (type) {
    case SET_ADMIN_LOADER:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

export default admin;
