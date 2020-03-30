import axios from 'axios';

// Actions
import { notice } from 'actions/utils';

// Types
import { SET_EXTRA_LOADER, SET_MARKET_ITEMS } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const getMarketItems: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = (page = 1, perPage = 20) => async dispatch => {
  dispatch({ type: SET_EXTRA_LOADER, payload: true });

  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URI +
        `/others/market?page=${page}&perPage=${perPage}`
    );

    dispatch({ type: SET_MARKET_ITEMS, payload: data });
    notice(data);
  } catch (error) {
    notice(error);
  }

  dispatch({ type: SET_EXTRA_LOADER, payload: false });
};

export default getMarketItems;
