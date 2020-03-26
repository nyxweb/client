import Character from './Character';
import Guild from './Guild';

export default interface RankState {
  hof: {
    loading: boolean;
    list: Character[] | null;
  };

  top5guilds: {
    loading: boolean;
    list: Guild[] | null;
  };

  characters: {
    loading: boolean;
    list: Character[] | null;
    count: number | null;
  };

  character: {
    loading: boolean;
    char: Character | null | false;
  };

  guild: {
    loading: boolean;
    data: Guild | null | false;
  };
}
