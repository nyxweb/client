import axios from 'axios';

// Types
import { ADMIN_LOGIN, ADMIN_LOGIN_FAILED } from 'redux/types';
import AppState from 'interfaces/redux/admin/AppState';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const adminLogin: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = ({ username, password }) => async dispatch => {
  try {
    const { data: response } = await axios.post('/admin/auth', {
      username,
      password
    });

    if (response.token) {
      dispatch({
        type: ADMIN_LOGIN,
        payload: {
          username,
          token: response.token
        }
      });
    } else {
      dispatch({
        type: ADMIN_LOGIN_FAILED
      });
    }
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAILED
    });
  }
};

export default adminLogin;
