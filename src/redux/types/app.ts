import LoginState from './Login';
import CharactersState from './Characters';

export default interface AppState {
  login: LoginState;
  characters: CharactersState;
}

export interface ReduxAction {
  type: string;
  payload?: any;
}
