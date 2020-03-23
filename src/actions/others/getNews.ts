import axios from 'axios';

// Types
import { SET_NEWS_LOADING, SET_NEWS } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const getNews: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = () => async dispatch => {
  dispatch({ type: SET_NEWS_LOADING, payload: true });

  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URI + `/others/news`
    );

    dispatch({ type: SET_NEWS, payload: data });
  } catch (error) {
    dispatch({ type: SET_NEWS, payload: false });
  }

  dispatch({ type: SET_NEWS_LOADING, payload: false });
};

export default getNews;
