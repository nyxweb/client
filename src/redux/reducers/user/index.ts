import { combineReducers } from 'redux';

// Reducers
import account from 'redux/reducers/user/account';
import character from 'redux/reducers/user/character';
import extra from 'redux/reducers/user/extra';
import admin from 'redux/reducers/user/admin';

const reducers = combineReducers({
  account,
  character,
  extra,
  admin
});

export default reducers;
