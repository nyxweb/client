import { combineReducers } from 'redux';

// Reducers
import hof from './hof';
import top5guilds from './top5guilds';
import characters from './characters';
import character from './character';
import guild from './guild';

const reducers = combineReducers({
  hof,
  top5guilds,
  characters,
  character,
  guild
});

export default reducers;
