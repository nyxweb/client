export interface TopCharacter {
  Name: string;
  Class: number;
  HOFWins: number;
  'status.ConnectStat': number;
  'account.GameIDC': string;
}

export default interface Characters {
  topCharacters: TopCharacter[] | null;
}
