export default interface Resource {
  name:
    | 'zen'
    | 'credits'
    | 'chaos'
    | 'bless'
    | 'soul'
    | 'creation'
    | 'stone'
    | 'rena'
    | 'guardian'
    | 'satan'
    | 'angel'
    | 'unilia'
    | 'dino'
    | 'bok1'
    | 'bok2'
    | 'bok3'
    | 'bok4'
    | 'bok5'
    | 'boh'
    | 'bol'
    | 'heart'
    | string;

  value?: number | string;
  size?: number;
  margin?: string;
}
