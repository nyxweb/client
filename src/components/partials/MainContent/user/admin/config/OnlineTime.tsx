import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Reusales
import Button from 'components/reusables/form/Button';

// Actions
import { updateConfig } from 'actions/user/admin';

// Types
import AppState from 'redux/types/app';
import { notice } from 'actions/utils';

interface Props {}

const OnlineTime: React.FC<Props> = () => {
  const [time, setTime] = useState<number>();

  const online = useSelector((state: AppState) => state.config.online_time);
  const dispatch = useDispatch();

  useEffect(() => {
    online && setTime(online);
  }, [online]);

  const handleSave = () => {
    if (time) {
      if (isNaN(time)) {
        return notice({
          error: 'Please use only numbers.'
        });
      }

      dispatch(updateConfig('online_time', time));
    }
  };

  return (
    <div className='Events'>
      <div className='title'>
        Online Time Configuration
        <Button value='save changes' looks='green' onClick={handleSave} />
      </div>
      <div className='field'>
        <input
          type='number'
          value={time}
          onChange={e => setTime(Number(e.target.value))}
        />
      </div>
      <div className='info'>How many credits per online hour</div>
    </div>
  );
};

export default OnlineTime;
