import Character from './Character';

export default interface CharactersState {
  loading: boolean;
  list: Character[] | null;
}
