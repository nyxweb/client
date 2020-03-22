import axios from 'axios';

// Actions
import { notice } from 'actions/utils';

// Types
import { LOGIN, LOGIN_FAILED, SET_LOGIN_LOADER } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const userLogin: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = ({ username, password }, history) => async dispatch => {
  dispatch({ type: SET_LOGIN_LOADER, payload: true });

  try {
    const { data } = await axios.post(
      process.env.REACT_APP_API_URI + '/user/account/auth',
      { username, password }
    );

    localStorage.nyxToken = data.jwt_token;
    axios.defaults.headers.common.nyxAuthToken = data.jwt_token;

    dispatch({ type: LOGIN, payload: data });
    notice(data);

    if (!window.location.pathname.includes('/user/')) {
      history.push('/user/account/logs');
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILED });
    notice(error);
  }

  dispatch({ type: SET_LOGIN_LOADER, payload: false });
};

export default userLogin;
