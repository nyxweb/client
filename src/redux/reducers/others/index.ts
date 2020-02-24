import { combineReducers } from 'redux';

// Reducers
import events from 'redux/reducers/others/events';
import market from 'redux/reducers/others/market';

const reducers = combineReducers({
  events,
  market
});

export default reducers;
