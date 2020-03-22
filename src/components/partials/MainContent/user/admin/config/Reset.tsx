import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Reusales
import Button from 'components/reusables/form/Button';

// Actions
import { notice } from 'actions/utils';
import { updateConfig } from 'actions/user/admin';

// Types
import AppState from 'redux/types/app';
import { cclass } from 'helpers/characters';

interface IReset {
  max_reset: number;
  reset_level: number;
  reset_zen: number;
  reset_zen_formula: boolean;
  reset_stats: boolean;
  bonus_stats: number[];
  [key: string]: any;
}

interface Props {}

const Reset: React.FC<Props> = () => {
  const [reset, setReset] = useState<IReset>();

  const config = useSelector((state: AppState) => state.config.reset);
  const dispatch = useDispatch();

  useEffect(() => {
    config && setReset(config);
  }, [config]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/[,\.]/g, ''));
    const id = Number(e.target.dataset.id);

    if (reset) {
      if (isNaN(id)) {
        setReset({
          ...reset,
          [e.target.name]: value
        });
      } else {
        const list = [...reset.bonus_stats];
        list[id] = value;

        setReset({
          ...reset,
          bonus_stats: list
        });
      }
    }
  };

  const toggle = (name: string) => {
    if (reset) {
      setReset({
        ...reset,
        [name]: !reset[name]
      });
    }
  };

  const handleSave = () => {
    if (reset) {
      dispatch(updateConfig('reset', JSON.stringify(reset)));
    }
  };

  return (
    <div className='Reset'>
      <div className='title'>
        Reset Configuration
        <Button value='save changes' looks='green' onClick={handleSave} />
      </div>
      {reset && (
        <table>
          <tbody>
            <tr>
              <td>Max Reset</td>
              <td>
                <input
                  type='number'
                  name='max_reset'
                  value={reset.max_reset}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Reset Level</td>
              <td>
                <input
                  type='number'
                  name='reset_level'
                  value={reset.reset_level}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Cost per Reset</td>
              <td>
                <input
                  type='text'
                  name='reset_zen'
                  value={reset.reset_zen.toLocaleString()}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Cost formula on/off</td>
              <td>
                <input
                  type='checkbox'
                  checked={reset.reset_zen_formula}
                  onChange={() => toggle('reset_zen_formula')}
                />
              </td>
            </tr>
            <tr>
              <td>Reset Stats</td>
              <td>
                <input
                  type='checkbox'
                  checked={reset.reset_stats}
                  onChange={() => toggle('reset_stats')}
                />
              </td>
            </tr>
            {reset.reset_stats && (
              <tr>
                <td colSpan={2}>
                  <table className='clean'>
                    {reset.bonus_stats.map((s, i) => (
                      <tr key={i}>
                        <td align='right'>
                          {cclass.charClass(
                            i === 0
                              ? 1
                              : i === 1
                              ? 17
                              : i === 2
                              ? 33
                              : i === 3
                              ? 48
                              : 64
                          )}
                        </td>
                        <td>
                          <input
                            type='number'
                            name='stats'
                            data-id={i}
                            value={s}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                    ))}
                  </table>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reset;
