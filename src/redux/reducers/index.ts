import { combineReducers } from 'redux';

// Reducers
import login from 'redux/reducers/login';
import characters from 'redux/reducers/characters';

const reducers = combineReducers({
  login,
  characters
});

export default reducers;
