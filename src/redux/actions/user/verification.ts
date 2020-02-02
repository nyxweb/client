import axios from 'axios';

// Types
import { USER_LOGOUT } from 'redux/types/actions';
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
    await axios.post(process.env.REACT_APP_API_URI + '/users/verify');
  } catch (error) {
    dispatch({
      type: USER_LOGOUT
    });
  }
};

export default userVerification;
