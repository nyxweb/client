import { combineReducers } from 'redux';

// Reducers
import login from 'redux/reducers/login';
import rankings from 'redux/reducers/rankings';
import others from 'redux/reducers/others';

const reducers = combineReducers({
  login,
  rankings,
  others
});

export default reducers;
