import React from 'react';

// Helpers
import { name } from 'helpers/items';
import { cclass } from 'helpers/characters';

// Config
import optionsList from 'config/items/options.json';
import ancientList from 'config/items/ancient.json';

// Types
import Item from 'redux/types/items/Item';

const getImage = require.context('../../../../assets/images/items/', true);

interface Props {
  item: Item;
  itemData: any;
  image?: boolean;
}

const Options: React.FC<Props> = ({ item, itemData, image = false }) => {
  const options: any = optionsList;
  const ancient: any = ancientList;

  const getItemImage = (name: string) => {
    try {
      return getImage(name);
    } catch (error) {
      return getImage('./unknown.png');
    }
  };

  return (
    <div className='Options'>
      <div className='row name' style={name(item)}>
        {itemData.name} {item.level > 0 && '+' + item.level}
      </div>
      <div className='row dur'>Durability: {item.durability}</div>
      {image && (
        <div className='row item-pic'>
          <img
            src={getItemImage(`./${item.group}/${item.id}.gif`)}
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
      {item.three80 && itemData.options.pink && (
        <div className='row pink'>
          {options.pink.map((pink: string, i: number) => (
            <div key={i}>{pink}</div>
          ))}
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
          {item.excellent.map((x: number, i: number) =>
            x ? (
              <div key={i}>{options[itemData.options.excellent][i]}</div>
            ) : null
          )}
        </div>
      )}
      {!!item.ancient && !!itemData.options.ancient && (
        <div className='row ancient'>
          {ancient[itemData.options.ancient].options.map(
            (anc: string, i: number) => (
              <div key={i}>{anc}</div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Options;
