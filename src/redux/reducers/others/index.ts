import { combineReducers } from 'redux';

// Reducers
import market from 'redux/reducers/others/market';
import news from 'redux/reducers/others/news';

const reducers = combineReducers({
  market,
  news
});

export default reducers;
