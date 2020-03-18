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

const location = (map: number) => {
  switch (map) {
    case 0:
      return "<font color='#e3e48b'>Lorencia</font>";
    case 1:
      return "<font color='#cccccc'>Dungeon</font>";
    case 2:
      return "<font color='#66ccd8'>Davias</font>";
    case 3:
      return "<font color='#4e9c46'>Noria</font>";
    case 4:
      return 'Lost Tower';
    case 5:
      return 'Exile';
    case 6:
      return 'Stadium';
    case 7:
      return 'Atlans';
    case 8:
      return 'Tarkan';
    case 9:
    case 32:
      return 'Devil Square';
    case 10:
      return 'Icarus';
    case 11:
      return 'Blood Castle 1';
    case 12:
      return 'Blood Castle 2';
    case 13:
      return 'Blood Castle 3';
    case 14:
      return 'Blood Castle 4';
    case 15:
      return 'Blood Castle 5';
    case 16:
      return 'Blood Castle 6';
    case 17:
      return 'Blood Castle 7';
    case 18:
      return 'Chaos Castle 1';
    case 19:
      return 'Chaos Castle 2';
    case 20:
      return 'Chaos Castle 3';
    case 21:
      return 'Chaos Castle 4';
    case 22:
      return 'Chaos Castle 5';
    case 23:
      return 'Chaos Castle 6';
    case 24:
      return 'Kalima 1';
    case 25:
      return 'Kalima 2';
    case 26:
      return 'Kalima 3';
    case 27:
      return 'Kalima 4';
    case 28:
      return 'Kalima 5';
    case 29:
      return 'Kalima 6';
    case 36:
      return 'Kalima 7';
    case 30:
      return 'Valley Of Loren';
    case 31:
      return 'Land of Trials';
    case 33:
      return 'Aida';
    case 34:
      return 'Crywolf Fortress';
    case 37:
      return 'Kantru 1';
    case 38:
      return 'Kantru 2';
    case 39:
      return 'Kantru 3';
    case 40:
      return 'Silent Map';
    case 41:
      return 'Barracks of Balgass';
    case 42:
      return 'Balgass Refuge';
    case 45:
      return 'Illusion Temple 1';
    case 46:
      return 'Illusion Temple 2';
    case 47:
      return 'Illusion Temple 3';
    case 48:
      return 'Illusion Temple 4';
    case 49:
      return 'Illusion Temple 5';
    case 50:
      return 'Illusion Temple 6';
    case 51:
      return 'Elbeland';
    case 52:
      return 'Blood Castle 8';
    case 53:
      return 'Chaos Castle 7';
    case 55:
      return 'Valley Of Loren';
    case 56:
      return 'Swamp of Calmness';
    case 57:
      return 'Raklion';
    case 58:
      return 'Raklion Boss';
    case 62:
      return 'Villages Santa';
    case 63:
      return 'Vulcanus';
    case 64:
      return 'Duel Arena';
    case 65:
    case 66:
    case 67:
    case 68:
      return 'Doppelganger';
    case 69:
    case 70:
    case 71:
    case 72:
      return 'Empire Fortress';
    default:
      return 'Unknown';
  }
};

const pkStatus = (pk: number) => {
  if (pk < 0) {
    return `<font color='#92c2d4'>Hero</font> ( ${pk} )`;
  } else if (pk === 0) {
    return `<font color='#e6f7ff'>Commoner</font> ( ${pk} )`;
  } else if (pk === 1) {
    return `<font color='#ffad73'>Killer</font> ( ${pk} )`;
  } else if (pk === 2) {
    return `<font color='#ff5833'>Outlaw</font> ( ${pk} )`;
  } else {
    return `<font color='#ff0000'>Phonomania</font> ( ${pk} )`;
  }
};

const guildPosition = (pos: number) => {
  switch (pos) {
    case 128:
      return `<font color='#ff0000'>Guild Master</font>`;
    case 64:
      return `<font color='#92c2d4'>Assist. Master</font>`;
    case 32:
      return `<font color='#ffad73'>Battle Master</font>`;
    default:
      return `<font color='#e6f7ff'>Member</font>`;
  }
};

export default { winsTranslate, location, pkStatus, guildPosition };
