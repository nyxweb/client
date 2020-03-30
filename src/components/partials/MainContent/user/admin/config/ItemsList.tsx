import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Icons
import { ReactComponent as RemoveX } from 'assets/icons/delete.svg';
import { ReactComponent as Delete } from 'assets/icons/trash.svg';
import { ReactComponent as Add } from 'assets/icons/add.svg';

// Reusales
import Button from 'components/reusables/form/Button';

// Actions
import { updateConfig } from 'actions/user/admin';

// Types
import AppState from 'redux/types/app';
import uuid from 'uuid';

interface Props {}

const ItemsList: React.FC<Props> = () => {
  const [list, setList] = useState<any>();
  const [ancient, setAncient] = useState<any>();
  const [selected, setSelected] = useState<any>();

  const items = useSelector((state: AppState) => state.config.itemsList);
  const ancientList = useSelector(
    (state: AppState) => state.config.itemsAncient
  );
  const dispatch = useDispatch();

  useEffect(() => {
    items && setList(items);
  }, [items]);

  useEffect(() => {
    ancientList &&
      setAncient(Object.entries(ancientList).map(([name]) => name));
  }, [ancientList]);

  const handleDelete = () => {
    const updated = { ...list };
    delete updated[selected.group].items[selected.id];
    setList(updated);
    setSelected(undefined);
  };

  const handleSave = () => {
    if (list && selected) {
      const group = selected.group;
      const id = selected.id;
      delete selected.group;
      delete selected.id;

      list[group].items[id] = selected;

      dispatch(updateConfig('itemsList', JSON.stringify(list)));
    }
  };

  const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [group, id] = e.target.value.split(':');
    setSelected({
      ...list[group].items[id],
      group,
      id
    });
  };

  const onChangeClass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Class = Number(e.target.dataset.class);
    const updated = { ...selected };
    if (updated.class && updated.class.includes(Class)) {
      const index = updated.class.findIndex((c: number) => c === Class);
      updated.class.splice(index, 1);
    } else {
      updated.class.push(Class);
    }

    updated.class = updated.class.sort((a: number, b: number) => a - b);

    setSelected(updated);
  };

  const onChangeAncient = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const anc1 = e.target.name === 'ancient1';
    const value = e.target.value === 'off' ? false : e.target.value;
    const updated = { ...selected };

    if (updated.options.ancient) {
      updated.options.ancient.splice(anc1 ? 0 : 1, 1, value);
    } else {
      updated.options.ancient = anc1 ? [value, false] : [false, value];
    }

    setSelected(updated);
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updated = { ...selected };
    updated.options[e.target.name] =
      e.target.value === 'off' ? false : e.target.value;
    setSelected(updated);
  };

  const onChangeLevelName = (name: string, level: number) => {
    const updated = { ...selected };
    if (updated.levels) {
      updated.levels[level] = name;
    } else {
      updated.levels = [name];
    }

    setSelected(updated);
  };

  const removeLevel = (index: number) => {
    const updated = { ...selected };
    if (Object.entries(updated.levels).length > 1) {
      delete updated.levels[index];
    } else {
      delete updated.levels;
    }

    setSelected(updated);
  };

  return (
    <>
      <div className='ItemsList'>
        <div className='title'>
          <span className='itemSelector'>
            Select item
            {list && (
              <select
                onChange={handleItemSelect}
                defaultValue={
                  selected ? `${selected.group}:${selected.id}` : '-'
                }
              >
                <option>-</option>
                {Object.entries(list).map(([group, groupData]: any) => (
                  <optgroup
                    key={uuid()}
                    label={`${groupData.title} ( ${
                      Object.entries(groupData.items).length
                    } )`}
                  >
                    {Object.entries(groupData.items).map(([id, item]: any) => (
                      <option key={uuid()} value={`${group}:${id}`}>
                        {item.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            )}
          </span>
          <Button value='save changes' looks='green' onClick={handleSave} />
        </div>
      </div>
      <div className='ItemsList'>
        {!selected ? (
          'start by selecting an item'
        ) : (
          <div className='item-fields'>
            <Delete className='delete-item' onClick={handleDelete} />
            <input
              type='text'
              className='name'
              name='name'
              value={selected.name}
              onChange={e => setSelected({ ...selected, name: e.target.value })}
            />
            <table className='section'>
              <caption>size</caption>
              <tbody>
                <tr>
                  <td>x</td>
                  <td>
                    <input
                      type='number'
                      value={selected.x}
                      onChange={e =>
                        setSelected({ ...selected, x: Number(e.target.value) })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>y</td>
                  <td>
                    <input
                      type='number'
                      value={selected.y}
                      onChange={e =>
                        setSelected({ ...selected, y: Number(e.target.value) })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table className='section'>
              <caption>options</caption>
              <tbody>
                <tr>
                  <td>excellent</td>
                  <td>
                    <select
                      defaultValue={selected.options.excellent}
                      onChange={e =>
                        setSelected({
                          ...selected,
                          options: {
                            ...selected.options,
                            excellent: Number(e.target.value)
                          }
                        })
                      }
                    >
                      <option>off</option>
                      <option value={1}>weapons</option>
                      <option value={2}>staffs</option>
                      <option value={3}>armors</option>
                      <option value={4}>wings</option>
                      <option value={5}>cape</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>skill</td>
                  <td>
                    <input
                      type='checkbox'
                      checked={selected.options.skill}
                      onChange={() =>
                        setSelected({
                          ...selected,
                          options: {
                            ...selected.options,
                            skill: selected.options.skill
                              ? !selected.options.skill
                              : true
                          }
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>additional</td>
                  <td>
                    <select
                      name='additional'
                      defaultValue={selected.options.additional}
                      onChange={onChangeSelect}
                    >
                      <option>off</option>
                      <option value='dmg'>Add DMG</option>
                      <option value='deff'>Add Deff</option>
                      <option value='wiz'>Wiz DMG</option>
                      <option value='rec'>HP Rec</option>
                      <option value='mana'>Max mana</option>
                      <option value='dmgwiz'>dmgwiz (mg)</option>
                      <option value='arrows'>arrows</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>level 380</td>
                  <td>
                    <select
                      name='pink'
                      defaultValue={selected.options.pink}
                      onChange={onChangeSelect}
                    >
                      <option>off</option>
                      <option value='weapon'>Weapon</option>
                      <option value='helm'>Helm</option>
                      <option value='armor'>Armor</option>
                      <option value='pants'>Pants</option>
                      <option value='gloves'>Gloves</option>
                      <option value='boots'>Boots</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>ancient 5</td>
                  <td>
                    <select name='ancient1' onChange={onChangeAncient}>
                      <option>off</option>
                      {ancient &&
                        ancient.map((a: string, i: number) => (
                          <option key={i} value={a}>
                            {a}
                          </option>
                        ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>ancient 10</td>
                  <td>
                    <select name='ancient2' onChange={onChangeAncient}>
                      <option>off</option>
                      {ancient &&
                        ancient.map((a: string, i: number) => (
                          <option key={i} value={a}>
                            {a}
                          </option>
                        ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className='section'>
              <caption>can be worn by</caption>
              <tbody>
                <tr>
                  <td>Dark Wizard</td>
                  <td>
                    <input
                      type='checkbox'
                      data-class={0}
                      checked={selected.class.includes(0)}
                      onChange={onChangeClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Soul Master</td>
                  <td>
                    <input
                      type='checkbox'
                      data-class={1}
                      checked={selected.class.includes(1)}
                      onChange={onChangeClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Grand Master</td>
                  <td>
                    <input
                      type='checkbox'
                      data-class={2}
                      checked={selected.class.includes(2)}
                      onChange={onChangeClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Dark Knight</td>
                  <td>
                    <input
                      type='checkbox'
                      data-class={16}
                      checked={selected.class.includes(16)}
                      onChange={onChangeClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Blade Knight</td>
                  <td>
                    <input
                      type='checkbox'
                      data-class={17}
                      checked={selected.class.includes(17)}
                      onChange={onChangeClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Blade Master</td>
                  <td>
                    <input
                      type='checkbox'
                      data-class={18}
                      checked={selected.class.includes(18)}
                      onChange={onChangeClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Fairy Elf</td>
                  <td>
                    <input
                      type='checkbox'
                      data-class={32}
                      checked={selected.class.includes(32)}
                      onChange={onChangeClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Muse Elf</td>
                  <td>
                    <input
                      type='checkbox'
                      data-class={33}
                      checked={selected.class.includes(33)}
                      onChange={onChangeClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td>High Elf</td>
                  <td>
                    <input
                      type='checkbox'
                      data-class={34}
                      checked={selected.class.includes(34)}
                      onChange={onChangeClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Magic Gladiator</td>
                  <td>
                    <input
                      type='checkbox'
                      data-class={48}
                      checked={selected.class.includes(48)}
                      onChange={onChangeClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Duel Master</td>
                  <td>
                    <input
                      type='checkbox'
                      data-class={49}
                      checked={selected.class.includes(49)}
                      onChange={onChangeClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Dark Lord</td>
                  <td>
                    <input
                      type='checkbox'
                      data-class={64}
                      checked={selected.class.includes(64)}
                      onChange={onChangeClass}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Lord Emperor</td>
                  <td>
                    <input
                      type='checkbox'
                      data-class={65}
                      checked={selected.class.includes(65)}
                      onChange={onChangeClass}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table className='section'>
              <caption>
                levels ( e.g rena +1 = stone ) <Add className='addLevel' />
              </caption>
              <tbody>
                {selected.levels && Object.entries(selected.levels).length ? (
                  Object.entries(selected.levels).map(([level, name]: any) => (
                    <tr>
                      <td>+{level}</td>
                      <td className='itemLevels'>
                        <input
                          type='text'
                          value={name}
                          onChange={e =>
                            onChangeLevelName(e.target.value, level)
                          }
                        />
                        <RemoveX
                          className='removeLevel'
                          onClick={() => removeLevel(level)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2}>no levels</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemsList;
