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

const Stats: React.FC<Props> = () => {
  const [stats, setStats] = useState<number>();

  const config = useSelector((state: AppState) => state.config.stats);
  const dispatch = useDispatch();

  useEffect(() => {
    config && setStats(config);
  }, [config]);

  const handleSave = () => {
    if (stats) {
      if (isNaN(stats)) {
        return notice({
          error: 'Please use only numbers.'
        });
      }

      dispatch(updateConfig('stats', stats));
    }
  };

  return (
    <div className='Events'>
      <div className='title'>
        Max Stats Configuration
        <Button value='save changes' looks='green' onClick={handleSave} />
      </div>
      <div className='field'>
        <input
          type='number'
          value={stats}
          onChange={e => setStats(Number(e.target.value))}
        />
      </div>
      <div className='info'>Max stats allowed</div>
    </div>
  );
};

export default Stats;
