import UserState from './user/User';
import Character from './rankings/Character';
import Guild from './rankings/Guild';
import Event from './others/Event';
import MarketState from './others/MarketState';

export default interface AppState {
  user: UserState;
  rankings: {
    hof: Character[];
    top5guilds: Guild[];
    characters: Character[];
  };
  others: {
    events: Event[];
    market: MarketState;
  };
}

export interface ReduxAction {
  type: string;
  payload?: any;
}
