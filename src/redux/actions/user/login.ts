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
      data: { token }
    } = await axios.post(process.env.REACT_APP_API_URI + '/users/auth', {
      username,
      password
    });

    localStorage.nyxLogin = username;
    localStorage.nyxToken = token;

    axios.defaults.headers.common.nyxAuthToken = token;

    dispatch({
      type: USER_LOGIN,
      payload: {
        username,
        token
      }
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED
    });
  }
};

export default userLogin;
