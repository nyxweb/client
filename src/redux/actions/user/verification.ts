import axios from 'axios';

// Types
import { USER_LOGIN, USER_LOGOUT } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const userVerification: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = () => async dispatch => {
  try {
    const {
      data: { username, reg_time, reg_ip, vip, vip_exp }
    } = await axios.post(process.env.REACT_APP_API_URI + '/users/verify');

    dispatch({
      type: USER_LOGIN,
      payload: {
        username,
        reg_time,
        reg_ip,
        vip,
        vip_exp
      }
    });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT
    });
  }
};

export default userVerification;
