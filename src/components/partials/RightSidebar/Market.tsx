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
                  <Item hex={item.hex} image={true} />
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
