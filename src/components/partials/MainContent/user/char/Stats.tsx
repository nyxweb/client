import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Partials
import Loader from 'components/partials/Loader';

// Actions
import { getChars, saveStats } from 'actions/user/character';

// Reusales
import Button from 'components/reusables/form/Button';

// Types
import AppState from 'redux/types/app';
import Character from 'redux/types/rankings/Character';

interface Props {}

const Stats: React.FC<Props> = () => {
  const [char, setChar] = useState<Character>();
  const [pointsLeft, setPointsLeft] = useState<number>();

  const initialStats: { [name: string]: number } = {
    Strength: 0,
    Dexterity: 0,
    Vitality: 0,
    Energy: 0,
    Leadership: 0
  };
  const [form, setForm] = useState(initialStats);

  const { loading, list } = useSelector(
    (state: AppState) => state.user.character
  );
  const maxStats = useSelector((state: AppState) => state.config.stats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChars());
  }, [dispatch]);

  useEffect(() => {
    setChar(undefined);
    setForm(initialStats);
    // eslint-disable-next-line
  }, [list]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const find = list && list.find(c => c.Name === e.target.value);
    setChar(find ? find : undefined);
    setPointsLeft(find ? find.LevelUpPoint : 0);
    setForm(initialStats);
  };

  const typer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!char || !list || !maxStats) return;

    const value = Number(e.target.value);
    const name = e.target.name;
    const newForm: any = {
      ...form,
      [name]:
        char[name] + value > Number(maxStats)
          ? Number(maxStats) - char[name]
          : value
    };

    const sum =
      newForm.Strength +
      newForm.Dexterity +
      newForm.Vitality +
      newForm.Energy +
      newForm.Leadership;

    if (typeof value === 'number' && value >= 0 && char.LevelUpPoint >= sum) {
      setForm(newForm);
      setPointsLeft(char.LevelUpPoint - sum);
    }
  };

  const onClickSave = () => {
    if (char) {
      dispatch(saveStats({ ...form, Name: char.Name }));
    }
  };

  return (
    <div className='Stats'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='content'>
            {!list || !list.length ? (
              <div className='no-data'>No characters found</div>
            ) : (
              <div className='main'>
                <div className='char-list'>
                  <div className='select'>
                    <select
                      onChange={onChangeHandler}
                      defaultValue={char?.Name}
                    >
                      <option value=''>-</option>
                      {list.map((c, i) => (
                        <option key={i} value={c.Name}>
                          {c.Name} ( {c.LevelUpPoint.toLocaleString()} )
                        </option>
                      ))}
                    </select>
                  </div>
                  {char ? (
                    <div className='char-preview'>
                      <table className='Table'>
                        <tbody>
                          <tr>
                            <td>Strength</td>
                            <td>
                              <span
                                className={`shadow ${
                                  !!form.Strength ? 'added' : ''
                                }`}
                              >
                                {char.Strength + form.Strength}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>Agility</td>
                            <td>
                              <span
                                className={`shadow ${
                                  !!form.Dexterity ? 'added' : ''
                                }`}
                              >
                                {char.Dexterity + form.Dexterity}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>Vitality</td>
                            <td>
                              <span
                                className={`shadow ${
                                  !!form.Vitality ? 'added' : ''
                                }`}
                              >
                                {char.Vitality + form.Vitality}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>Energy</td>
                            <td>
                              <span
                                className={`shadow ${
                                  !!form.Energy ? 'added' : ''
                                }`}
                              >
                                {char.Energy + form.Energy}
                              </span>
                            </td>
                          </tr>
                          {[64, 65].includes(char.Class) && (
                            <tr>
                              <td>Command</td>
                              <td>
                                <span
                                  className={`shadow ${
                                    !!form.Leadership ? 'added' : ''
                                  }`}
                                >
                                  {char.Leadership + form.Leadership}
                                </span>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className='text'>
                      Start by selecting your character
                    </div>
                  )}
                </div>
                <div className='stats-adder'>
                  <div className='points-left'>
                    Points left&nbsp;
                    <span className='shadow'>
                      {pointsLeft?.toLocaleString() || '-'}
                    </span>
                  </div>
                  <div className='stats'>
                    <table className='Table characters'>
                      <tbody>
                        <tr>
                          <td>Strength</td>
                          <td>
                            <input
                              type='number'
                              name='Strength'
                              onChange={typer}
                              value={form.Strength || ''}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Agility</td>
                          <td>
                            <input
                              type='number'
                              name='Dexterity'
                              onChange={typer}
                              value={form.Dexterity || ''}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Vitality</td>
                          <td>
                            <input
                              type='number'
                              name='Vitality'
                              onChange={typer}
                              value={form.Vitality || ''}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Energy</td>
                          <td>
                            <input
                              type='number'
                              name='Energy'
                              onChange={typer}
                              value={form.Energy || ''}
                            />
                          </td>
                        </tr>
                        {char && [64, 65].includes(char.Class) && (
                          <tr>
                            <td>Command</td>
                            <td>
                              <input
                                type='number'
                                name='Leadership'
                                onChange={typer}
                                value={form.Leadership || ''}
                              />
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className='save-button'>
                    <Button value='save stats' onClick={onClickSave} />
                  </div>
                </div>
              </div>
            )}
          </div>
          {maxStats && (
            <div className='info'>
              <ul style={{ lineHeight: 1.8 }}>
                <li>
                  Current max stats is{' '}
                  <span className='highlight'>{maxStats}</span>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Stats;
