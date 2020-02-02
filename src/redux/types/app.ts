import LoginState from './Login';

export default interface AppState {
  login: LoginState;
}

export interface ReduxAction {
  type: string;
  payload?: any;
}
