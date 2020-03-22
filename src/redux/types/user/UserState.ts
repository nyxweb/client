import AccountState from './AccountState';
import CharacterState from './CharacterState';
import ExtraState from './ExtraState';
import AdminState from './AdminState';

export default interface UserState {
  loading: boolean;
  account: AccountState;
  character: CharacterState;
  extra: ExtraState;
  admin: AdminState;
}
