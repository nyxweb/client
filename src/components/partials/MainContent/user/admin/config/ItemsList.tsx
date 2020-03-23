import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Icons
import { ReactComponent as Delete } from 'assets/icons/delete.svg';
import { ReactComponent as Add } from 'assets/icons/add.svg';

// Reusales
import Button from 'components/reusables/form/Button';

// Actions
import { updateConfig } from 'actions/user/admin';

// Types
import AppState from 'redux/types/app';
import uuid from 'uuid';

interface Props {}

const Downloads: React.FC<Props> = () => {
  const [list, setList] = useState<any>();
  const [ancient, setAncient] = useState<any>();

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

  const remove = (group: string, id: string) => {
    const updated = { ...list };
    delete updated[group].items[id];
    setList(updated);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { group, id } = e.target.dataset;
    const value = e.target.value;

    const updated = { ...list };
    updated[group!].items[id!][e.target.name] = value;
    setList(updated);
  };

  const handleSave = () => {
    if (list) {
      dispatch(updateConfig('itemsList', JSON.stringify(list)));
    }
  };

  return (
    <>
      <div className='ItemsList'>
        <div className='title'>
          <span className='new-download'>Items List</span>
          <Button value='save changes' looks='green' onClick={handleSave} />
        </div>
      </div>
      {list &&
        Object.entries(list).map(([group, iData]: any, i) => (
          <div className='ItemsList' key={i}>
            <div className='group'>
              <span>
                <span className='highlight'>{group}</span> {iData.title} ({' '}
                {Object.entries(iData.items).length} )
              </span>
              <Add className='add-icon' />
            </div>
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>x/y</th>
                  <th>skill</th>
                  <th>excellent</th>
                  <th>additional</th>
                  <th>pink</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(iData.items).map(([id]) => {
                  const item = iData.items[id];
                  const exo = item.options && item.options.excellent;
                  const add = item.options && item.options.additional;
                  const pink = item.options && item.options.pink;
                  item.class = item.class || [];

                  return (
                    <>
                      <tr key={uuid()}>
                        <td rowSpan={2} className='controls-cage'>
                          <div className='_controls'>
                            <Delete
                              className='delete'
                              onClick={() => remove(group, id)}
                            />
                          </div>
                          <input
                            type='text'
                            name='id'
                            data-group={group}
                            data-id={id}
                            value={id}
                            className='item-id'
                          />
                        </td>
                        <td>
                          <input
                            type='text'
                            name='name'
                            data-group={group}
                            data-id={id}
                            value={item.name}
                            className='item-name'
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <input
                            type='number'
                            name='x'
                            data-group={group}
                            data-id={id}
                            value={item.x}
                            className='item-xy'
                            onChange={handleInput}
                          />
                          <input
                            type='number'
                            name='y'
                            data-group={group}
                            data-id={id}
                            value={item.y}
                            className='item-xy'
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <input
                            type='checkbox'
                            name='skill'
                            data-group={group}
                            data-id={id}
                            checked={item.options.skill}
                          />
                        </td>
                        <td>
                          <select
                            name='excellent'
                            data-group={group}
                            data-id={id}
                            defaultValue={exo}
                          >
                            <option>off</option>
                            <option value={1}>weapons</option>
                            <option value={2}>staffs</option>
                            <option value={3}>armors</option>
                            <option value={4}>wings</option>
                            <option value={5}>cape</option>
                          </select>
                        </td>
                        <td>
                          <select
                            name='additional'
                            data-group={group}
                            data-id={id}
                            defaultValue={add}
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
                        <td>
                          <select
                            name='pink'
                            data-group={group}
                            data-id={id}
                            defaultValue={pink}
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
                      <tr key={uuid()}>
                        <td colSpan={4}>
                          <span className='item-class'>
                            DW
                            <input
                              type='checkbox'
                              name='item-class'
                              data-group={group}
                              data-id={id}
                              data-class={0}
                              checked={item.class.includes(0)}
                            />
                          </span>
                          <span className='item-class'>
                            SM
                            <input
                              type='checkbox'
                              name='item-class'
                              data-group={group}
                              data-id={id}
                              data-class={1}
                              checked={item.class.includes(1)}
                            />
                          </span>
                          <span className='item-class'>
                            DK
                            <input
                              type='checkbox'
                              name='item-class'
                              data-group={group}
                              data-id={id}
                              data-class={16}
                              checked={item.class.includes(16)}
                            />
                          </span>
                          <span className='item-class'>
                            BK
                            <input
                              type='checkbox'
                              name='item-class'
                              data-group={group}
                              data-id={id}
                              data-class={17}
                              checked={item.class.includes(17)}
                            />
                          </span>
                          <span className='item-class'>
                            ELF
                            <input
                              type='checkbox'
                              name='item-class'
                              data-group={group}
                              data-id={id}
                              data-class={32}
                              checked={item.class.includes(32)}
                            />
                          </span>
                          <span className='item-class'>
                            ME
                            <input
                              type='checkbox'
                              name='item-class'
                              data-group={group}
                              data-id={id}
                              data-class={33}
                              checked={item.class.includes(33)}
                            />
                          </span>
                          <span className='item-class'>
                            MG
                            <input
                              type='checkbox'
                              name='item-class'
                              data-group={group}
                              data-id={id}
                              data-class={48}
                              checked={item.class.includes(48)}
                            />
                          </span>
                          <span className='item-class'>
                            DL
                            <input
                              type='checkbox'
                              name='item-class'
                              data-group={group}
                              data-id={id}
                              data-class={64}
                              checked={item.class.includes(64)}
                            />
                          </span>
                        </td>
                        <td>
                          <select
                            name='ancient1'
                            data-group={group}
                            data-id={id}
                          >
                            <option>ancient 5</option>
                            {ancient &&
                              ancient.map((a: string, i: number) => (
                                <option key={i} value={a}>
                                  {a}
                                </option>
                              ))}
                          </select>
                        </td>
                        <td>
                          <select
                            name='ancient2'
                            data-group={group}
                            data-id={id}
                          >
                            <option>ancient 10</option>
                            {ancient &&
                              ancient.map((a: string, i: number) => (
                                <option key={i} value={a}>
                                  {a}
                                </option>
                              ))}
                          </select>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
    </>
  );
};

export default Downloads;
