import { MARKET_LATEST, MARKET_LATEST_FAILED } from 'redux/types/actions';
import { ReduxAction } from 'redux/types/app';
import _nyxMarket from 'redux/types/others/_nyxMarket';

interface MarketState {
  latest: {
    list: _nyxMarket[] | null;
    count: number | null;
  };
}

const initialState: MarketState = {
  latest: { list: null, count: null }
};

const market = (state = initialState, action: ReduxAction) => {
  const { type, payload } = action;

  switch (type) {
    case MARKET_LATEST:
      return {
        ...state,
        latest: payload
      };
    case MARKET_LATEST_FAILED:
      return {
        ...state,
        latest: {
          list: false,
          count: 0
        }
      };
    default:
      return state;
  }
};

export default market;
