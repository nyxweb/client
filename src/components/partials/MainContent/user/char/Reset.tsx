import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Partials
import Loader from 'components/partials/Loader';

// Actions
import { getChars, reset } from 'actions/user/character';

// Helpers
import { cclass } from 'helpers/characters';

// Reusales
import Button from 'components/reusables/form/Button';

// Types
import AppState from 'redux/types/app';
import Name from 'components/partials/Character/Name';

interface Props {}

const Reset: React.FC<Props> = () => {
  const { loading, list } = useSelector(
    (state: AppState) => state.user.character
  );
  const config = useSelector((state: AppState) => state.config.reset);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChars());
  }, [dispatch]);

  return (
    <div className='Reset'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='content'>
            {!list || !list.length ? (
              <div className='no-data'>No characters found</div>
            ) : (
              <table className='Table characters'>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>level</th>
                    <th>zen</th>
                    <th>pk</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((char, i) => (
                    <tr key={i}>
                      <td>
                        <div className='centered'>
                          <Name char={char} guild={false} />
                        </div>
                      </td>
                      <td>
                        {char.cLevel}
                        <sup>{char.Resets}</sup>
                      </td>
                      <td>{char.Money.toLocaleString()}</td>
                      <td>{char.PkCount}</td>
                      <td style={{ textAlign: 'right' }}>
                        {config &&
                          char.Resets < config.max_reset &&
                          char.cLevel === config.reset_level &&
                          char.Money >=
                            (config.reset_zen_formula
                              ? (char.Resets + 1) * config.reset_zen
                              : config.reset_zen) && (
                            <Button
                              value='reset'
                              onClick={() => dispatch(reset(char))}
                            />
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {config && (
            <div className='info'>
              <ul style={{ lineHeight: 1.8 }}>
                <li>
                  Current max resets are{' '}
                  <span className='highlight'>{config.max_reset}</span>
                </li>
                <li>
                  Reset level is{' '}
                  <span className='highlight'>{config.reset_level}</span>
                </li>
                <li>
                  You will need{' '}
                  <span className='highlight'>
                    {config.reset_zen.toLocaleString()}{' '}
                    {config.reset_zen_formula && ' * Reset Number'}
                  </span>{' '}
                  zen to reset your character
                </li>
                <li>
                  {config.reset_stats ? (
                    <>
                      Bonus points per reset
                      <ul style={{ paddingLeft: 20, lineHeight: 1.3 }}>
                        {config.bonus_stats.map((stats, i) => (
                          <li key={i}>
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
                            : <span className='highlight'>{stats}</span> * RR
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    'Your character keeps its stats after reset'
                  )}
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reset;
