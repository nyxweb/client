const colorDecode = (key: string) => {
  switch (key) {
    case '1':
      return '#000000';
    case '2':
      return '#8c8a8d';
    case '3':
      return '#ffffff';
    case '4':
      return '#fe0000';
    case '5':
      return '#ff8a00';
    case '6':
      return '#ffff00';
    case '7':
      return '#8cff01';
    case '8':
      return '#00ff00';
    case '9':
      return '#01ff8d';
    case 'A':
      return '#00ffff';
    case 'B':
      return '#008aff';
    case 'C':
      return '#0000fe';
    case 'D':
      return '#8c00ff';
    case 'E':
      return '#ff00fe';
    case 'F':
      return '#ff0080';
    default:
      return 'transparent';
  }
};

export default colorDecode;
