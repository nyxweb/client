import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Partials
import Loader from 'components/partials/Loader';

// Actions
import { getOnline, exchangeOnline } from 'actions/user/account';

// Types
import AppState from 'redux/types/app';

// Reusales
import Button from 'components/reusables/form/Button';

interface Props {}

const Online: React.FC<Props> = () => {
  const { info, loading } = useSelector(
    (state: AppState) => state.user.account
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnline());
  }, [dispatch]);

  return (
    <div className='Online'>
      {loading ? (
        <Loader />
      ) : !info?.status ? (
        <div>You haven't been online</div>
      ) : (
        <>
          <div>
            <div style={{ textAlign: 'center' }}>
              For every hour you are online in the game you get 10 credits.
            </div>
          </div>
          <div className='content'>
            You have{' '}
            <span style={{ color: 'lightblue' }}>
              {Math.floor(info.status.TotalTime / 60)}
            </span>{' '}
            hours to exchange and you will get{' '}
            <span style={{ color: 'lightblue' }}>
              {Math.floor(info.status.TotalTime / 60) * 10}
            </span>{' '}
            credits
            <Button
              value='exchange'
              style={{ float: 'right' }}
              onClick={() => dispatch(exchangeOnline())}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Online;
