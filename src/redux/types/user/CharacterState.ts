import Character from '../rankings/Character';

export default interface CharacterState {
  loading: boolean;
  list: Character[] | null;
}
