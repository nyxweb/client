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
import Pagination from 'components/reusables/Pagination';

interface Props {}

const Market: React.FC<Props> = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState<number>();
  const [modal, setModal] = useState({
    title: 'Are you sure you want to buy this item?',
    accept: 'buy now',
    decline: `don't buy`,
    open: false
  });
  const [selectedItem, setItem] = useState<number>();

  const {
    loading,
    market: { list, count: totalItems }
  } = useSelector((state: AppState) => state.user.extra);
  const config = useSelector((state: AppState) => state.config.market);

  const dispatch = useDispatch();

  useEffect(() => {
    perPage && dispatch(getMarketItems(page, perPage));
  }, [dispatch, page, perPage]);

  useEffect(() => {
    config && setPerPage(config.per_page);
  }, [config]);

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
      <div className='itemsList'>
        {loading ? (
          <Loader />
        ) : !list || !totalItems ? (
          'no data'
        ) : (
          <div>
            {list.map(item => {
              const price = !item.price ? item.price : JSON.parse(item.price);

              return (
                <div
                  key={uuid()}
                  className={`itemBlock ${!price ? 'free' : ''}`}
                >
                  <div className='price1'>
                    {price[0] && (
                      <Resource
                        key={uuid()}
                        resource={price[0]}
                        style={{ margin: '5px 5px 0 5px', fontSize: 9 }}
                        size={27}
                      />
                    )}
                    {price[1] && (
                      <Resource
                        key={uuid()}
                        resource={price[1]}
                        style={{ margin: '5px 5px 0 5px', fontSize: 9 }}
                        size={27}
                      />
                    )}
                  </div>

                  <div
                    className='item'
                    onClick={() => purchaseItem(item.index)}
                  >
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
                          size={27}
                        />
                      )
                    )}
                    {price[3] && (
                      <Resource
                        key={uuid()}
                        resource={price[3]}
                        style={{ margin: '5px 0 5px 5px', fontSize: 9 }}
                        size={27}
                      />
                    )}
                    {price[4] && (
                      <Resource
                        key={uuid()}
                        resource={price[4]}
                        style={{ margin: '5px 0 5px 5px', fontSize: 9 }}
                        size={27}
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
          </div>
        )}
      </div>
      {totalItems && perPage && (
        <Pagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          totalItems={totalItems}
        />
      )}
      <Modal
        modal={modal}
        onAccept={onAccept}
        onDecline={onDecline}
        open={modal.open}
      />
    </div>
  );
};

export default Market;
