import { combineReducers } from 'redux';

// Reducers
import events from 'redux/reducers/others/events';

const reducers = combineReducers({
  events
});

export default reducers;
