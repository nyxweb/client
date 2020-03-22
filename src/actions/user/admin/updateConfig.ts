import axios from 'axios';

// Actions
import { notice } from 'actions/utils';
import { getConfig } from 'actions/config';

// Types
import { SET_ADMIN_LOADER } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const updateConfig: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = (configName, updated) => async dispatch => {
  dispatch({ type: SET_ADMIN_LOADER, payload: true });

  try {
    const { data } = await axios.patch(
      process.env.REACT_APP_API_URI + '/admin/config',
      {
        configName,
        updated
      }
    );

    await dispatch(getConfig());

    notice(data);
  } catch (error) {
    notice(error);
  }

  dispatch({ type: SET_ADMIN_LOADER, payload: false });
};

export default updateConfig;
