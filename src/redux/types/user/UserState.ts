import AccountState from 'redux/types/user/AccountState';
import CharacterState from 'redux/types/user/CharacterState';
import ExtraState from 'redux/types/user/ExtraState';

export default interface UserState {
  loginLoader: boolean;
  loading: boolean;
  account: AccountState;
  character: CharacterState;
  extra: ExtraState;
}
