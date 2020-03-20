export const genBinValue = (n: number) => {
  switch (n) {
    case 0:
      return 1;
    case 1:
      return 2;
    case 2:
      return 4;
    case 3:
      return 8;
    case 4:
      return 16;
    case 5:
      return 32;
    case 6:
      return 64;
    case 7:
    default:
      return 128;
  }
};

const insert = (str: string, mass: string, pos: number) =>
  mass.slice(0, pos) + str + mass.slice(pos + str.length);

interface Item {
  group: number;
  id: number;
  excellent?: number[];
  durability?: number;
  luck?: boolean;
  level?: number;
  skill?: boolean;
  options?: number;
  serial?: string;
  ancient?: number;
  pink?: boolean;
  harmony?: {
    type: number;
    level: number;
  };
}

const dec2hex = (dec: number, length = 1) =>
  length === 1
    ? dec.toString(16)
    : dec.toString(16).length === 1
    ? '0' + dec.toString(16)
    : dec.toString(16);

const generateHex = ({
  group,
  id,
  level = 0,
  excellent = [0, 0, 0, 0, 0, 0],
  durability = 255,
  luck = false,
  skill = false,
  options = 0,
  serial,
  ancient = 0,
  pink = false,
  harmony = {
    type: 0,
    level: 0
  }
}: Item): string | false => {
  let hex: string = '0'.repeat(32);
  let exos = 0;

  // group
  hex = insert(dec2hex(group), hex, 18);
  // id
  hex = insert(dec2hex(id, 2), hex, 0);

  // level skill luck options
  const opts =
    level * 8 +
    (skill ? 128 : 0) +
    (luck ? 4 : 0) +
    (options <= 3 ? options : options - 4);
  hex = insert(dec2hex(opts, 2), hex, 2);

  if (options > 3) {
    exos += 64;
  }

  // excellent options
  excellent.forEach((o, i) => (exos += o ? genBinValue(i) : 0));
  hex = insert(dec2hex(exos, 2), hex, 14);

  // durability
  hex = insert(dec2hex(durability, 2), hex, 4);

  // ancient
  hex = insert(dec2hex(ancient === 1 ? 5 : ancient === 2 ? 10 : 0), hex, 17);

  // pink
  hex = insert(dec2hex(pink ? 8 : 0), hex, 19);

  // harmony
  hex = insert(dec2hex(harmony.type), hex, 20);
  hex = insert(dec2hex(harmony.level), hex, 21);

  // serial
  hex = insert('f'.repeat(8), hex, 6);

  return hex;
};

export default generateHex;

// console.log(
//   generateHex({
//     group: 0,
//     id: 22,
//     level: 15,
//     luck: true,
//     skill: true,
//     options: 5,
//     excellent: [1, 1, 1, 1, 1, 1],
//     durability: 22,
//     ancient: 0,
//     pink: true,
//     harmony: {
//       level: 15,
//       type: 10
//     }
//   })
// );
