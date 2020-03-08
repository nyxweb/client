import { combineReducers } from 'redux';

// Reducers
import user from 'redux/reducers/user';
import rankings from 'redux/reducers/rankings';
import others from 'redux/reducers/others';

const reducers = combineReducers({
  user,
  rankings,
  others
});

export default reducers;
