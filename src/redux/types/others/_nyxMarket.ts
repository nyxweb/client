import Character from '../rankings/Character';

export default interface _nyxMarket {
  index: number;
  account: string;
  character: string;
  hex: string;
  price: string;
  name: string;
  id: number;
  type: number;
  level: number;
  exo1: number;
  exo2: number;
  exo3: number;
  exo4: number;
  exo5: number;
  exo6: number;
  options: number;
  ancient: number;
  timestamp: number;
  character_: Character;
}
