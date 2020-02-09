import Guild from './Guild';
import Character from './Character';

export default interface GuildMember {
  Name: string;
  G_Name: string;
  G_Level: number;
  G_Status: number;
  guild: Guild;
  character: Character;
}
