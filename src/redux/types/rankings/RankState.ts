import HOFState from './HOFState';
import top5GuildsState from './top5GuildsState';
import CharactersState from './CharactersState';

export default interface RankState {
  hof: HOFState;
  top5guilds: top5GuildsState;
  characters: CharactersState;
}
