import { combineReducers } from 'redux';

// Reducers
import account from 'redux/reducers/user/account';
import character from 'redux/reducers/user/character';
import extra from 'redux/reducers/user/extra';

const reducers = combineReducers({
  account,
  character,
  extra
});

export default reducers;
