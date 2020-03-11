import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';

// Partials
import Loader from 'components/partials/Loader';

// Actions
import { getVIP, buyVIP } from 'actions/user/account';

// Types
import AppState from 'redux/types/app';

// Reusales
import Button from 'components/reusables/form/Button';

interface Props {}

const VIP: React.FC<Props> = () => {
  const [vipDays, setVipDays] = useState(1);

  const { info, loading } = useSelector(
    (state: AppState) => state.user.account
  );
  const vipCost = useSelector((state: AppState) => state.config.vip);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVIP());
  }, []);

  return (
    <div className='VIP'>
      {loading || !info || !vipCost ? (
        <Loader />
      ) : (
        <>
          <div className='head'>
            {info.IsVip ? (
              <div>
                Your VIP status expires{' '}
                <span
                  title={new Date(info.VipExpirationTime * 1000).toString()}
                >
                  <Moment fromNow unix>
                    {info.VipExpirationTime}
                  </Moment>
                </span>
              </div>
            ) : (
              `You are currently not a VIP`
            )}
          </div>
          <div className='content'>
            <select onChange={e => setVipDays(Number(e.target.value))}>
              <option value={1}>1 day ({vipCost * 1} cr)</option>
              <option value={2}>2 days ({vipCost * 2} cr)</option>
              <option value={7}>7 days ({vipCost * 7} cr)</option>
              <option value={14}>14 days ({vipCost * 14} cr)</option>
              <option value={30}>30 days ({vipCost * 30} cr)</option>
            </select>
            <Button value='buy' onClick={() => dispatch(buyVIP(vipDays))} />
          </div>
          <div className='info'>
            <div className='title'>
              While you are VIP you gain the following advantages:
            </div>
            <ul>
              <li>Experience +10x and Drop +20% boost in-game.</li>
              <li>
                No additional fees when selling/buying items on the market.
              </li>
              <li>50% less zen cost for reseting characters.</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default VIP;
