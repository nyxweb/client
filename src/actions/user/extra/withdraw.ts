import axios from 'axios';

// Actions
import { notice } from 'actions/utils';

// Types
import { WAREHOUSE_UPDATE, SET_EXTRA_LOADER } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import Resource from 'redux/types/reusables/Resource';

const depositResources: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = (resources: Resource[]) => async dispatch => {
  dispatch({ type: SET_EXTRA_LOADER, payload: true });

  try {
    const { data } = await axios.patch(
      process.env.REACT_APP_API_URI + '/user/extra/resources/withdraw',
      { deposits: resources }
    );

    // dispatch({ type: WAREHOUSE_UPDATE, payload: data.warehouse });
    notice(data);
  } catch (error) {
    notice(error);
  }

  dispatch({ type: SET_EXTRA_LOADER, payload: false });
};

export default depositResources;
