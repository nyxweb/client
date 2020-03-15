import Character from './Character';

export default interface CharacterState {
  loading: boolean;
  char: Character | null | false;
}
