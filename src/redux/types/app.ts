import UserState from './user/UserState';
import RankState from './rankings/RankState';
import OtherState from './others/OtherState';

export default interface AppState {
  user: UserState;
  rankings: RankState;
  others: OtherState;
}

export interface ReduxAction {
  type: string;
  payload?: any;
}
