interface IDecode {
  id: number;
  group: number;
  excellent: number[];
  durability: number;
  luck: number;
  level: number;
  skill: number;
  options: number;
  serial: string;
  ancient: number;
}

const hexDecode = (hex: string): IDecode | false => {
  if (hex.length !== 32 || hex.toLowerCase() === 'f'.repeat(32)) {
    return false;
  }

  const [_group, _options, durability, , , , , exo, _ancient] = Buffer.from(
    hex,
    'hex'
  );

  const serial = hex.substr(6, 8);
  const excellent = Array(6)
    .fill('')
    .map((_, index) => (exo >> index) & 0b1);
  const group = ((_group >> 4) | ((exo >> 3) & 0b10000)) >> 1;
  const id = (_group & 0b00001111) | ((_group >> 4) % 2 ? 0b10000 : 0);
  const luck = (_options >> 2) & 0b1;
  const level = (_options >> 3) & 0b1111;
  const skill = (_options >> 7) & 0b1;
  const options = (_options & 0b11) | (((exo >> 6) & 0b1) << 2);
  const ancient = _ancient & 0b100 ? 5 : _ancient & 0b1000 ? 10 : 0;

  return {
    group,
    id,
    excellent,
    durability,
    luck,
    level,
    skill,
    options,
    serial,
    ancient
  };
};

export default hexDecode;
