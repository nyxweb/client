import { decode } from '.';
import Item from 'redux/types/items/Item';
import Resource from 'redux/types/reusables/Resource';

const items = (warehouse: string, item: Item | Resource): number => {
  let count = 0;

  if (warehouse) {
    warehouse.match(/.{32}/g)!.forEach(hex => {
      if (/^[a-f0-9]{32}$/i.test(hex) && hex.toLowerCase() !== 'f'.repeat(32)) {
        const decoded = decode(hex);
        if (
          decoded &&
          decoded.group === item.group &&
          decoded.id === item.id &&
          decoded.level === item.level
        ) {
          count++;
        }
      }
    });
  }

  return count;
};

export default { items };
