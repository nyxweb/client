import { CSSProperties } from 'react';
import Item from '../../redux/types/items/Item';

const nameColor = (item: Item) => {
  const style: CSSProperties = {};

  if (item.ancient) {
    // Ancient
    style.backgroundColor = '#0000ff';
    style.color = '#01df01';
  } else if (item.excellent.find(exo => exo)) {
    // Excellent
    style.color = '#12b322';
  } else if (item.level >= 7) {
    // Golden
    style.color = '#fff200';
  } else {
    // Everything else
    style.color = '#80b2ff';
  }

  return style;
};

export default nameColor;
