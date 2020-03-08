import { combineReducers } from 'redux';

// Reducers
import user from 'redux/reducers/user';
import rankings from 'redux/reducers/rankings';
import others from 'redux/reducers/others';
import config from 'redux/reducers/config';

const reducers = combineReducers({
  user,
  rankings,
  others,
  config
});

export default reducers;
