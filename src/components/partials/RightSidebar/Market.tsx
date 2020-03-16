import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Partials
import ContentBlock from 'components/partials/RightSidebar/ContentBlock';
import Resource from 'components/reusables/particles/Resource';
import Item from 'components/reusables/particles/items/Item';

// Reusables
import ReactLoader from 'components/reusables/ReactLoader';

// Actions
import { getLatest } from 'actions/others/market';

// Types
import AppState from 'redux/types/app';
import IResource from 'redux/types/reusables/Resource';

interface Props {}

const Market: React.FC<Props> = () => {
  const latest = useSelector((state: AppState) => state.others.market.latest);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLatest());
  }, [dispatch]);

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
          latest.map((item, i) => {
            const price = item.price ? JSON.parse(item.price) : null;

            return (
              <div className='Item' key={i}>
                <div className='price'>
                  {price
                    ? price.map((r: IResource, i: number) => (
                        <Resource
                          key={i}
                          resource={r}
                          style={{ margin: '7px 7px 7px 0' }}
                        />
                      ))
                    : 'free'}
                </div>
                <div className='image'>
                  <Item
                    hex={item.hex}
                    image={true}
                    slotSize={70}
                    realSize={false}
                  />
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

export default Market;
