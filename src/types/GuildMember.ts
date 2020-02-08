import Guild from './Guild';

export default interface GuildMember {
  Name: string;
  G_Name: string;
  G_Level: number;
  G_Status: number;
  guild: Guild;
}
