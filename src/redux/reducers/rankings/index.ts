import { combineReducers } from 'redux';

// Reducers
import hof from 'redux/reducers/rankings/hof';
import top5guilds from 'redux/reducers/rankings/top5guilds';
import characters from 'redux/reducers/rankings/characters';

const reducers = combineReducers({
  hof,
  top5guilds,
  characters
});

export default reducers;
