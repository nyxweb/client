import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Partials
import ContentBlock from 'components/partials/RightSidebar/ContentBlock';
import Resource from 'components/reusables/particles/Resource';
import Item from 'components/reusables/particles/items/Item';

// Reusables
import ReactLoader from 'components/reusables/ReactLoader';
import Modal from 'components/reusables/Modal';

// Actions
import { getLatest } from 'actions/others/market';
import { buyItem } from 'actions/user/extra';

// Types
import AppState from 'redux/types/app';
import IResource from 'redux/types/reusables/Resource';

interface Props {}

const Market: React.FC<Props> = () => {
  const [modal, setModal] = useState({
    title: 'Are you sure you want to buy this item?',
    accept: 'buy now',
    decline: `don't buy`,
    open: false
  });
  const [selectedItem, setItem] = useState<number>();

  const { list } = useSelector((state: AppState) => state.others.market.latest);
  const config = useSelector((state: AppState) => state.config.market);
  const dispatch = useDispatch();

  useEffect(() => {
    config && dispatch(getLatest(1, config.sidebar_total));
  }, [dispatch, config]);

  const onAccept = () => {
    setModal({ ...modal, open: false });
    dispatch(buyItem(selectedItem));
  };

  const onDecline = () => setModal({ ...modal, open: false });

  const purchaseItem = (id: number) => {
    setItem(id);
    setModal({ ...modal, open: true });
  };

  return (
    <ContentBlock title='market items' desc='latest items on the market'>
      <div className='MarketItems'>
        {!list ? (
          list === null ? (
            <ReactLoader />
          ) : (
            'Failed to load'
          )
        ) : list.length ? (
          list.map((item, i) => {
            const price = item.price ? JSON.parse(item.price) : null;

            return (
              <div className='Item' key={i}>
                <div className='price'>
                  {price ? (
                    price.map((r: IResource, i: number) => (
                      <Resource
                        key={i}
                        resource={r}
                        style={{ margin: '5px 5px 5px 0' }}
                      />
                    ))
                  ) : (
                    <span className='free'>free</span>
                  )}
                </div>
                <div className='image' onClick={() => purchaseItem(item.index)}>
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
      <Modal modal={modal} onAccept={onAccept} onDecline={onDecline} />
    </ContentBlock>
  );
};

export default Market;
