import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Partials
import Loader from 'components/partials/Loader';

// Actions
import { getVIP, exchangeOnline } from 'actions/user/account';

// Types
import AppState from 'redux/types/app';

// Reusales
import Button from 'components/reusables/form/Button';

interface Props {}

const VIP: React.FC<Props> = () => {
  const { info, loading } = useSelector(
    (state: AppState) => state.user.account
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVIP());
  }, []);

  return (
    <div className='VIP'>
      {loading || !info ? (
        <Loader />
      ) : (
        <>
          <div>
            <div style={{ textAlign: 'center' }}>
              {info.IsVip
                ? `Your VIP status expires in ${Math.floor(
                    info.VipExpirationTime / 60
                  )} hours`
                : `You are currently not a VIP.`}
            </div>
          </div>
          <div className='content'>
            <Button
              value='buy'
              style={{ float: 'right' }}
              onClick={() => dispatch(exchangeOnline())}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VIP;
