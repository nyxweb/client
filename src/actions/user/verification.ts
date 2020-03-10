import axios from 'axios';

// Types
import { LOGIN, LOGIN_FAILED, LOGOUT } from 'redux/types/actions';
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
    if (localStorage.nyxToken) {
      const { data } = await axios.post(
        process.env.REACT_APP_API_URI + '/user/account/verify'
      );

      dispatch({
        type: LOGIN,
        payload: data
      });
    } else {
      dispatch({
        type: LOGIN_FAILED
      });
    }
  } catch (error) {
    dispatch({
      type: LOGOUT
    });

    dispatch({
      type: LOGIN_FAILED
    });
  }
};

export default userVerification;
