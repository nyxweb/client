import React from 'react';

// Helpers
import { name } from 'helpers/items';
import { cclass } from 'helpers/characters';

// Types
import Item from 'redux/types/items/Item';
import { useSelector } from 'react-redux';
import AppState from '../../../../redux/types/app';

interface Props {
  item: Item;
  itemData: any;
  image?: boolean;
}

const Options: React.FC<Props> = ({ item, itemData, image = false }) => {
  const { itemsAncient: ancient, itemsOptions: options } = useSelector(
    (state: AppState) => state.config
  );

  // Ancient option
  const ancientName =
    !!item.ancient && itemData.options.ancient
      ? item.ancient === 10 && itemData.options.ancient[1]
        ? itemData.options.ancient[1]
        : itemData.options.ancient[0]
        ? itemData.options.ancient[0]
        : false
      : false;

  // Harmony (yellow option)
  const harmony =
    item.group === 5
      ? 'staffs'
      : [0, 1, 2, 3, 4].includes(item.group)
      ? 'weapons'
      : 'items';

  const itemName =
    itemData.levels && itemData.levels[item.level]
      ? itemData.levels[item.level]
      : itemData.name + `${item.level > 0 ? ' +' + item.level : ''}`;

  // Wings options
  if (item.group === 12) {
    itemData.options.additional = item.excellent[5] ? 'dmg' : 'rec';
  }

  return (
    options &&
    ancient && (
      <div className='Options'>
        <div className='row name' style={name(item)}>
          {ancientName} {itemName}
        </div>
        <div className='row dur'>Durability: {item.durability}</div>
        {image && (
          <div className='row item-pic'>
            <img
              src={`/images/items/${item.group}/${item.id}.gif`}
              alt='item'
            />
          </div>
        )}
        {!!itemData.class && (
          <div className='row equipped'>
            {itemData.class.map((cls: number, i: number) => (
              <div className='class' key={i}>
                Can be equipped by {cclass.charClass(cls)}
              </div>
            ))}
          </div>
        )}
        {item.pink &&
          itemData.options.pink &&
          options.pink[itemData.options.pink] && (
            <div className='row pink'>
              {options.pink[itemData.options.pink].map(
                (pink: string, i: number) => (
                  <div key={i}>{pink}</div>
                )
              )}
            </div>
          )}
        {!!item.harmony.type &&
          !!options.harmony[harmony][item.harmony.type - 1] && (
            <div className='row harmony'>
              {options.harmony[harmony][item.harmony.type - 1]} +
              {item.harmony.level}%
            </div>
          )}
        {item.skill && !!itemData.options.skill && (
          <div className='row skill'>This item has a special skill</div>
        )}
        {item.luck && (
          <div className='row luck'>
            {options.luck.map((luck: string, i: number) => (
              <div key={i}>{luck}</div>
            ))}
          </div>
        )}
        {!!item.options &&
          itemData.options &&
          itemData.options.additional &&
          options.additional[itemData.options.additional] && (
            <div className='row options'>
              {options.additional[itemData.options.additional]}{' '}
              {itemData.options.additional === 'rec' ||
              itemData.options.additional === 'arrows'
                ? item.options + '%'
                : '+' + item.options * 4}
            </div>
          )}
        {itemData.options.excellent && !!item.excellent.find(x => x) && (
          <div className='row excellent'>
            {item.excellent
              .filter(x => x)
              .map((_, i) => {
                if (
                  (item.group === 12 || item.group === 13) &&
                  (i === 0 || i === 1)
                ) {
                  options[itemData.options.excellent][i] = options[
                    itemData.options.excellent
                  ][i].replace('{placeholder}', 50 + item.level * 5);
                }

                return (
                  <div key={i}>{options[itemData.options.excellent][i]}</div>
                );
              })}
          </div>
        )}
        {!!item.ancient && !!itemData.options.ancient && !!ancientName && (
          <div className='row ancient'>
            <div className='head'>Set Options</div>
            {ancient[ancientName].options.map((anc: string, i: number) => (
              <div key={i}>{anc}</div>
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default Options;
