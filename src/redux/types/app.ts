import LoginState from './Login';
import Character from 'redux/types/rankings/Character';
import Event from 'redux/types/others/Event';
import Guild from './rankings/Guild';

export default interface AppState {
  login: LoginState;
  rankings: {
    hof: Character[];
    top5guilds: Guild[];
    characters: Character[];
  };
  others: {
    events: Event[];
  };
}

export interface ReduxAction {
  type: string;
  payload?: any;
}
