import axios from 'axios';

// Types
import { SET_ACCOUNT_LOADER } from 'redux/types/actions';

// Redux
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

// Actions
import { notice } from 'actions/utils';

interface Form {
  password: string;
  newPassword: string;
  newRePassword: string;
}

const changePassword: ActionCreator<ThunkAction<
  void,
  AppState,
  any,
  Action
>> = (form: Form) => async dispatch => {
  dispatch({
    type: SET_ACCOUNT_LOADER,
    payload: true
  });

  try {
    const { data } = await axios.patch(
      process.env.REACT_APP_API_URI + '/user/account/password',
      form
    );

    notice(data);
  } catch (error) {
    notice(error);
  }

  dispatch({
    type: SET_ACCOUNT_LOADER,
    payload: false
  });
};

export default changePassword;
