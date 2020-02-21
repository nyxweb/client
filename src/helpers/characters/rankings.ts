const winsTranslate = (num: number) => {
  switch (num) {
    case 0:
      return 'zero';
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    default:
      return 'five';
  }
};

export default { winsTranslate };
