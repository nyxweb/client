import {
  SET_NEWS_LOADING,
  SET_NEWS_SINGLE,
  SET_NEWS,
  CLEAR_NEWS_SINGLE,
  CLEAR_NEWS
} from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import _nyxNews from 'redux/types/others/_nyxNews';

interface NewsState {
  loading: boolean;
  single: _nyxNews | null;
  many: _nyxNews[] | null;
}

const initialState: NewsState = {
  loading: false,
  single: null,
  many: null
};

const news = (state = initialState, action: ReduxAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_NEWS_LOADING:
      return {
        ...state,
        loading: payload
      };
    case SET_NEWS_SINGLE:
      return {
        ...state,
        single: payload
      };
    case CLEAR_NEWS_SINGLE:
      return {
        ...state,
        single: null
      };
    case SET_NEWS:
      return {
        ...state,
        many: payload
      };
    case CLEAR_NEWS:
      return {
        ...state,
        many: null
      };
    default:
      return state;
  }
};

export default news;
