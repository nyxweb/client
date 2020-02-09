const charClass = (Class: number) => {
  switch (Class) {
    case 0:
      return 'Dark Wizard';
    case 1:
      return 'Soul Master';
    case 16:
      return 'Dark Knight';
    case 17:
      return 'Blade Knight';
    case 32:
      return 'Fairy Elf';
    case 33:
      return 'Muse Elf';
    case 48:
      return 'Magic Gladiator';
    case 64:
      return 'Dark Lord';
    default:
      return 'Unknown';
  }
};

const shortClass = (Class: number) => {
  switch (Class) {
    case 0:
    case 1:
      return 'sm';
    case 16:
    case 17:
      return 'bk';
    case 32:
    case 33:
      return 'elf';
    case 48:
      return 'mg';
    case 64:
      return 'dl';
    default:
      return 'none';
  }
};

export { charClass, shortClass };
