import Character from './Character';

export default interface HOFState {
  loading: boolean;
  list: Character[] | null;
}
