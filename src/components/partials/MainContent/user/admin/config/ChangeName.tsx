import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Reusales
import Button from 'components/reusables/form/Button';

// Actions
import { updateConfig } from 'actions/user/admin';

// Types
import AppState from 'redux/types/app';

interface IName {
  enabled: boolean;
  cost: number;
  min_length: number;
  max_length: number;
  [key: string]: any;
}

interface Props {}

const ChangeName: React.FC<Props> = () => {
  const [name, setName] = useState<IName>();

  const config = useSelector((state: AppState) => state.config.change_name);
  const dispatch = useDispatch();

  useEffect(() => {
    config && setName(config);
  }, [config]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (name) {
      setName({
        ...name,
        [e.target.name]: value
      });
    }
  };

  const toggle = () => {
    if (name) {
      setName({
        ...name,
        enabled: !name.enabled
      });
    }
  };

  const handleSave = () => {
    if (name) {
      dispatch(updateConfig('change_name', JSON.stringify(name)));
    }
  };

  return (
    <div className='ChangeName'>
      <div className='title'>
        Change Name
        <Button value='save changes' looks='green' onClick={handleSave} />
      </div>
      {name && (
        <table>
          <tbody>
            <tr>
              <td>Enabled</td>
              <td>
                <input
                  type='checkbox'
                  checked={name.enabled}
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
                  value={name.cost}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>New name min length</td>
              <td>
                <input
                  type='number'
                  name='min_length'
                  value={name.min_length}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>New name max length</td>
              <td>
                <input
                  type='number'
                  name='max_length'
                  value={name.max_length}
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

export default ChangeName;
