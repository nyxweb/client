import axios from 'axios';

// Actions
import { notice } from 'actions/utils';
import { getMarketItems } from '.';
import { getLatest } from 'actions/others/market';

// Types
import { SET_MODAL_LOADER, STORAGE_UPDATE } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const buyItem: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = (itemId, page = undefined) => async dispatch => {
  dispatch({ type: SET_MODAL_LOADER, payload: true });

  try {
    const { data } = await axios.patch(
      process.env.REACT_APP_API_URI + '/user/extra/market',
      { itemId }
    );

    dispatch({ type: STORAGE_UPDATE, payload: data.storage });
    dispatch(getMarketItems(page));
    dispatch(getLatest());
    notice(data);
  } catch (error) {
    notice(error);
  }

  dispatch({ type: SET_MODAL_LOADER, payload: false });
};

export default buyItem;
