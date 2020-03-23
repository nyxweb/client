import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Reusales
import Button from 'components/reusables/form/Button';

// Actions
import { updateConfig } from 'actions/user/admin';

// Types
import AppState from 'redux/types/app';

interface IClass {
  enabled: boolean;
  cost: number;
  min_resets: number;
  max_resets: number;
  min_level: number;
  [key: string]: any;
}

interface Props {}

const ChangeClass: React.FC<Props> = () => {
  const [cClass, setClass] = useState<IClass>();

  const config = useSelector((state: AppState) => state.config.change_class);
  const dispatch = useDispatch();

  useEffect(() => {
    config && setClass(config);
  }, [config]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (cClass) {
      setClass({
        ...cClass,
        [e.target.name]: value
      });
    }
  };

  const toggle = () => {
    if (cClass) {
      setClass({
        ...cClass,
        enabled: !cClass.enabled
      });
    }
  };

  const handleSave = () => {
    if (cClass) {
      dispatch(updateConfig('change_class', JSON.stringify(cClass)));
    }
  };

  return (
    <div className='ChangeClass'>
      <div className='title'>
        Change Class
        <Button value='save changes' looks='green' onClick={handleSave} />
      </div>
      {cClass && (
        <table>
          <tbody>
            <tr>
              <td>Enabled</td>
              <td>
                <input
                  type='checkbox'
                  checked={cClass.enabled}
                  onChange={toggle}
                />
              </td>
            </tr>
            <tr>
              <td>Cost in credits</td>
              <td>
                <input
                  type='number'
                  name='cost'
                  value={cClass.cost}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Min resets required</td>
              <td>
                <input
                  type='number'
                  name='min_resets'
                  value={cClass.min_resets}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Max resets allowed</td>
              <td>
                <input
                  type='number'
                  name='max_resets'
                  value={cClass.max_resets}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Min level required</td>
              <td>
                <input
                  type='number'
                  name='min_level'
                  value={cClass.min_level}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ChangeClass;
