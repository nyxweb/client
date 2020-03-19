import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppState from 'redux/types/app';

// Reusables
import Button from 'components/reusables/form/Button';
import Loader from 'components/partials/Loader';

// Actions
import { getChars, changeClass } from 'actions/user/character';
import { cclass } from 'helpers/characters';

interface Props {}

const Class: React.FC<Props> = () => {
  const [name, setName] = useState<string>();
  const [oldClass, setOldClass] = useState<number>();
  const [newClass, setNewClass] = useState<number>();

  const { loading, list } = useSelector(
    (state: AppState) => state.user.character
  );
  const config = useSelector((state: AppState) => state.config.change_class);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChars());
  }, [dispatch]);

  return (
    <div className='Class'>
      {loading ? (
        <Loader />
      ) : !list || !list.length ? (
        'No characters found'
      ) : config && config.enabled ? (
        <>
          <div className='fields'>
            <select
              onChange={e => {
                const getClass = list.find(c => c.Name === e.target.value);
                setName(e.target.value);
                setOldClass(getClass && getClass.Class);
              }}
              defaultValue={name}
            >
              <option value=''>-</option>
              {list.map((c, i) => (
                <option key={i} value={c.Name} disabled={newClass === c.Class}>
                  {c.Name} ( {cclass.charClass(c.Class)} )
                </option>
              ))}
            </select>

            <select
              onChange={e => setNewClass(Number(e.target.value))}
              defaultValue={newClass}
            >
              <option value='0'>new class</option>
              {config.classes.map((c, i) => (
                <option key={i} value={c} disabled={oldClass === c}>
                  {cclass.charClass(c)}
                </option>
              ))}
            </select>

            <Button
              value='submit'
              onClick={() => dispatch(changeClass(name, newClass))}
            />
          </div>
          {config && (
            <div className='info'>
              <ul style={{ lineHeight: 1.8 }}>
                <li>
                  Change Class costs{' '}
                  <span className='highlight'>{config.cost}</span> credits
                </li>
                {!!config.min_resets && (
                  <li>
                    You are allowed to change class after{' '}
                    <span className='highlight'>{config.min_resets}</span>{' '}
                    resets
                  </li>
                )}
                {!!config.max_resets && (
                  <li>
                    You are allowed to change class before you reach{' '}
                    <span className='highlight'>{config.max_resets}</span>{' '}
                    resets
                  </li>
                )}
                {!!config.min_level && (
                  <li>
                    You must reach level{' '}
                    <span className='highlight'>{config.min_level}</span> before
                    being able to change your class
                  </li>
                )}
              </ul>
            </div>
          )}
        </>
      ) : (
        'This module is currently disabled.'
      )}
    </div>
  );
};

export default Class;
