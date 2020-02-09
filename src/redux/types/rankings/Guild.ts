import GuildMember from './GuildMember';

export default interface Guild {
  G_Name: string;
  G_Mark: object;
  G_Score: number;
  G_Master: string;
  G_Count: number | null;
  Number: number;
  G_Type: number;
  G_Rival: number;
  G_Union: number;
  guild_memb: GuildMember[];
}
