const decode = (hex: string) => ({
  wings: hex.substr(224, 32),
  helm: hex.substr(64, 32),
  armor: hex.substr(96, 32),
  pants: hex.substr(128, 32),
  gloves: hex.substr(160, 32),
  boots: hex.substr(192, 32),
  wep1: hex.substr(0, 32),
  wep2: hex.substr(32, 32),
  pend: hex.substr(288, 32),
  ring1: hex.substr(320, 32),
  ring2: hex.substr(352, 32),
  pet: hex.substr(256, 32)
});

export default { decode };
