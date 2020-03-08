import UserState from './user/UserState';
import RankState from './rankings/RankState';
import OtherState from './others/OtherState';
import ConfigState from './ConfigState';

export default interface AppState {
  user: UserState;
  rankings: RankState;
  others: OtherState;
  config: ConfigState;
}

export interface ReduxAction {
  type: string;
  payload?: any;
}
