import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppState from 'redux/types/app';

// Reusables
import Button from 'components/reusables/form/Button';
import Loader from 'components/partials/Loader';

// Actions
import { getChars, changeName } from 'actions/user/character';

interface Props {}

const Name: React.FC<Props> = () => {
  const [name, setName] = useState<string>();
  const [newName, setNewName] = useState<string>();

  const { loading, list } = useSelector(
    (state: AppState) => state.user.character
  );
  const config = useSelector((state: AppState) => state.config.change_name);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChars());
  }, [dispatch]);

  return (
    <div className='UserCharName'>
      {loading ? (
        <Loader />
      ) : !list || !list.length ? (
        'No characters found'
      ) : (
        <>
          <div className='fields'>
            <select onChange={e => setName(e.target.value)}>
              <option value=''>-</option>
              {list.map((c, i) => (
                <option key={i} value={c.Name}>
                  {c.Name}
                </option>
              ))}
            </select>
            <input
              type='text'
              className='name'
              placeholder='new name'
              onChange={e => setNewName(e.target.value)}
            />
            <Button
              value='submit'
              onClick={() => dispatch(changeName(name, newName))}
            />
          </div>
          {config && (
            <div className='info'>
              <ul style={{ lineHeight: 1.8 }}>
                <li>
                  Change Name costs{' '}
                  <span className='highlight'>{config.cost}</span> credits
                </li>
                <li>
                  Your new name must be between{' '}
                  <span className='highlight'>{config.min_length}</span> and{' '}
                  <span className='highlight'>{config.max_length}</span>{' '}
                  characters
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Name;
