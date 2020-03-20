export default interface Item {
  group: number;
  id: number;
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
