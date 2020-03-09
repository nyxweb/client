import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';

// Partials
import Loader from 'components/partials/Loader';

// Actions
import { getChars, reset } from 'actions/user/character';

// Types
import AppState from 'redux/types/app';

// Reusales
import Button from 'components/reusables/form/Button';

interface Props {}

const Reset: React.FC<Props> = () => {
  const { loading, list } = useSelector(
    (state: AppState) => state.user.character
  );
  const vipCost = useSelector((state: AppState) => state.config.vip);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChars());
  }, []);

  return (
    <div className='Reset'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='content'>
            {!list || !list.length ? (
              `No character found`
            ) : (
              <div className='characters'>
                {list.map(char => (
                  <div className='char'>
                    {char.Name}
                    <Button
                      value='reset'
                      onClick={() => dispatch(reset(char.Name))}
                    />
                  </div>
                ))}
              </div>
            )}
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

export default Reset;
