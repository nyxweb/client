import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'uuid/v4';
import Moment from 'react-moment';

// Partials
import Loader from 'components/partials/Loader';
import Resource from 'components/reusables/particles/Resource';
import Item from 'components/reusables/particles/items/Item';

// Actions
import { getMarketItems, buyItem } from 'actions/user/extra';

// Types
import AppState from 'redux/types/app';
import Name from 'components/partials/Character/Name';
import Modal from 'components/reusables/Modal';

interface Props {}

const Market: React.FC<Props> = () => {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({
    title: 'Are you sure you want to buy this item?',
    accept: 'Yes, buy now',
    decline: `No, don't buy`,
    open: false
  });
  const [selectedItem, setItem] = useState<number>();

  const { loading, market } = useSelector(
    (state: AppState) => state.user.extra
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMarketItems(page));
  }, [dispatch, page]);

  if (false) setPage(1);

  const onAccept = () => {
    setModal({ ...modal, open: false });
    dispatch(buyItem(selectedItem, page));
  };

  const onDecline = () => setModal({ ...modal, open: false });

  const purchaseItem = (id: number) => {
    setItem(id);
    setModal({ ...modal, open: true });
  };

  return (
    <div className='Market'>
      {loading ? (
        <Loader />
      ) : !market ? (
        'no data'
      ) : (
        <div>
          {market.map(item => {
            const price = !item.price ? item.price : JSON.parse(item.price);

            return (
              <div key={uuid()} className={`itemBlock ${!price ? 'free' : ''}`}>
                <div className='price1'>
                  {price[0] && (
                    <Resource
                      key={uuid()}
                      resource={price[0]}
                      style={{ margin: '5px 5px 0 5px', fontSize: 9 }}
                      size={24}
                    />
                  )}
                  {price[1] && (
                    <Resource
                      key={uuid()}
                      resource={price[1]}
                      style={{ margin: '5px 5px 0 5px', fontSize: 9 }}
                      size={24}
                    />
                  )}
                </div>

                <div className='item' onClick={() => purchaseItem(item.index)}>
                  <Item hex={item.hex} className='content' />
                </div>

                <div className='price2'>
                  {!price ? (
                    <span className='priceFree'>free</span>
                  ) : (
                    price[2] && (
                      <Resource
                        key={uuid()}
                        resource={price[2]}
                        style={{ margin: '5px 0 5px 5px', fontSize: 9 }}
                        size={24}
                      />
                    )
                  )}
                  {price[3] && (
                    <Resource
                      key={uuid()}
                      resource={price[3]}
                      style={{ margin: '5px 0 5px 5px', fontSize: 9 }}
                      size={24}
                    />
                  )}
                  {price[4] && (
                    <Resource
                      key={uuid()}
                      resource={price[4]}
                      style={{ margin: '5px 0 5px 5px', fontSize: 9 }}
                      size={24}
                    />
                  )}
                </div>

                <div className='merchant'>
                  {item.character_ ? (
                    <Name char={item.character_} guild={false} />
                  ) : (
                    'hidden'
                  )}
                </div>

                <div className='time'>
                  <Moment unix fromNow>
                    {item.timestamp}
                  </Moment>
                </div>
              </div>
            );
          })}
          <Modal modal={modal} onAccept={onAccept} onDecline={onDecline} />
        </div>
      )}
    </div>
  );
};

export default Market;
