import axios from 'axios';

// Types
import { USER_LOGIN, USER_LOGIN_FAILED } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const userLogin: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = ({ username, password }) => async dispatch => {
  try {
    const {
      data: { username: account, reg_time, reg_ip, vip, vip_exp, token }
    } = await axios.post(process.env.REACT_APP_API_URI + '/users/auth', {
      username,
      password
    });

    localStorage.nyxToken = token;
    axios.defaults.headers.common.nyxAuthToken = token;

    dispatch({
      type: USER_LOGIN,
      payload: {
        username: account,
        reg_time,
        reg_ip,
        vip,
        vip_exp
      }
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED
    });
  }
};

export default userLogin;
