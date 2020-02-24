import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Partials
import ContentBlock from 'components/partials/RightSidebar/ContentBlock';
import Resource from 'components/reusables/particles/Resource';
import Item from 'components/reusables/particles/items/Item';

// Reusables
import ReactLoader from 'components/reusables/ReactLoader';

// Actions
import { getLatest } from 'actions/others/market';

// Types
import _nyxMarket from 'redux/types/others/_nyxMarket';
import AppState from 'redux/types/app';

interface Props {
  latest: _nyxMarket[];
  getLatest: Function;
}

const Market: React.FC<Props> = ({ latest, getLatest }) => {
  useEffect(() => {
    getLatest();
  }, [getLatest]);

  // const [items] = useState([
  //   {
  //     id: 1,
  //     group: 7,
  //     // options:
  //     //   '<div align=center style="padding-left: 6px; padding-right:6px;font-family:arial;font-size: 10px;"><span style="font-weight:bold;font-size: 11px;"><span style=color:#8CB0EA>Aquagold Crossbow </span><br><br></span></font> 200 durability <br><font color=#9aadd5>This weapon has a special skill</font> <br><font color=#9aadd5><br><font color=red>Can be equipped by Elf</font><br><br>Luck (success rate of Jewel of Soul +25%)<br>Luck (critical damage rate +5%)<br><font color=#9aadd5>Additional dmg +4</font></font> </div>',
  //     price: [
  //       { name: 'chaos', value: 33 },
  //       { name: 'creation', value: 9 }
  //     ]
  //   },
  //   {
  //     id: 12,
  //     group: 6,
  //     price: [
  //       { name: 'chaos', value: 33 },
  //       { name: 'bless', value: 2 },
  //       { name: 'soul', value: 5 },
  //       { name: 'stone', value: 9 }
  //     ]
  //   },
  //   {
  //     id: 5,
  //     group: 12,
  //     price: [
  //       { name: 'chaos', value: 33 },
  //       { name: 'bless', value: 2 },
  //       { name: 'soul', value: 5 },
  //       { name: 'creation', value: 9 },
  //       { name: 'rena', value: 9 }
  //     ]
  //   }
  // ]);

  return (
    <ContentBlock title='market items' desc='latest items on the market'>
      <div className='MarketItems'>
        {!latest ? (
          latest === null ? (
            <ReactLoader />
          ) : (
            'Failed to load'
          )
        ) : latest.length ? (
          latest.map((item: _nyxMarket, i: number) => {
            const price = item.price ? JSON.parse(item.price) : null;

            return (
              <div className='Item' key={i}>
                <div className='price'>
                  {price
                    ? price.map((p: any, i: number) => (
                        <Resource
                          key={i}
                          name={p.name}
                          value={p.value}
                          margin='7px 7px 7px 0'
                        />
                      ))
                    : 'free'}
                </div>
                <div className='image'>
                  <Item hex={item.hex} />
                </div>
              </div>
            );
          })
        ) : (
          'No data'
        )}
      </div>
    </ContentBlock>
  );
};

const mapStateToProps = (state: AppState) => ({
  latest: state.others.market.latest
});

export default connect(mapStateToProps, { getLatest })(Market);
