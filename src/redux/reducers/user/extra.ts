import { SET_EXTRA_LOADER, SET_MARKET_ITEMS } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import ExtraState from 'redux/types/user/ExtraState';

const initialState: ExtraState = {
  loading: false,
  auction: null,
  market: null,
  quests: null,
  resources: null,
  storage: null
};

const extra = (state = initialState, { type, payload }: ReduxAction) => {
  switch (type) {
    case SET_EXTRA_LOADER:
      return {
        ...state,
        loading: payload
      };
    case SET_MARKET_ITEMS:
      return {
        ...state,
        market: payload
      };
    default:
      return state;
  }
};

export default extra;
