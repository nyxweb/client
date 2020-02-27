export default interface Item {
  id: number;
  group: number;
  excellent: number[];
  durability: number;
  luck: boolean;
  level: number;
  skill: boolean;
  options: number;
  serial: string;
  ancient: number;
  pink: boolean;
  harmony: {
    type: number;
    level: number;
  };
}
