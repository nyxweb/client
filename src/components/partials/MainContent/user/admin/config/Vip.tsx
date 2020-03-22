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

const Vip: React.FC<Props> = () => {
  const [vip, setVip] = useState<number>();

  const config = useSelector((state: AppState) => state.config.vip);
  const dispatch = useDispatch();

  useEffect(() => {
    config && setVip(config);
  }, [config]);

  const handleSave = () => {
    if (vip) {
      if (isNaN(vip)) {
        return notice({
          error: 'Please use only numbers.'
        });
      }

      dispatch(updateConfig('vip', vip));
    }
  };

  return (
    <div className='Events'>
      <div className='title'>
        VIP Status Configuration
        <Button value='save changes' looks='green' onClick={handleSave} />
      </div>
      <div className='field'>
        <input
          type='number'
          value={vip}
          onChange={e => setVip(Number(e.target.value))}
        />
      </div>
      <div className='info'>How much credits to cost one day of VIP</div>
    </div>
  );
};

export default Vip;
