import axios from 'axios';

// Types
import { MARKET_LATEST, MARKET_LATEST_FAILED } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const getCharacters: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = (page, perPage) => async dispatch => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URI +
        `/others/market?page=${page}&perPage=${perPage}`
    );

    dispatch({
      type: MARKET_LATEST,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: MARKET_LATEST_FAILED
    });
  }
};

export default getCharacters;
