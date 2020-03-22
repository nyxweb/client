import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Icons
import { ReactComponent as Delete } from 'assets/icons/delete.svg';
import { ReactComponent as Add } from 'assets/icons/add.svg';
import { ReactComponent as ArrowUp } from 'assets/icons/arrow-up.svg';
import { ReactComponent as ArrowDown } from 'assets/icons/arrow-down.svg';

// Reusales
import Button from 'components/reusables/form/Button';
import Resource from 'components/reusables/particles/Resource';

// Actions
import { updateConfig } from 'actions/user/admin';

// Types
import AppState from 'redux/types/app';
import IResource from 'redux/types/reusables/Resource';

interface Props {}

const Resources: React.FC<Props> = () => {
  const [list, setList] = useState<IResource[]>();

  const resources = useSelector((state: AppState) => state.config.resources);
  const dispatch = useDispatch();

  useEffect(() => {
    resources && setList(resources);
  }, [resources]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...list];
    const index = Number(e.target.dataset.index);
    updated[index][e.target.name] = Number(
      e.target.value.substr(0, 1) === '0'
        ? e.target.value.substr(1, 1)
        : e.target.value
    );
    setList(updated);
  };

  const addResource = () => {
    const updated = [...list];
    updated.push({
      group: 0,
      id: 0,
      level: 0,
      value: 0
    });
    setList(updated);
  };

  const deleteRes = (index: number) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
  };

  const move = (index: number, dir: boolean = true) => {
    const updated = [...list];
    const item = updated.splice(index, 1);
    updated.splice(dir ? index - 1 : index + 1, 0, item[0]);
    setList(updated);
  };

  const handleSave = () => {
    if (list) {
      dispatch(updateConfig('resources', JSON.stringify(list)));
    }
  };

  return (
    <div className='Resources'>
      <div className='title'>
        <span className='new-resource'>
          Resources
          <Add className='add-icon' onClick={addResource} />
        </span>
        <Button value='save changes' looks='green' onClick={handleSave} />
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>preview</th>
            <th>group</th>
            <th>id</th>
            <th>level</th>
            <th>value</th>
            <th>controls</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((resource, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td
                  style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Resource resource={resource} style={{ margin: '0' }} />
                </td>
                <td>
                  <input
                    type='number'
                    name='group'
                    value={resource.group}
                    className='small'
                    data-index={i}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type='number'
                    name='id'
                    value={resource.id}
                    className='small'
                    data-index={i}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type='number'
                    name='level'
                    value={resource.level}
                    className='small'
                    data-index={i}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type='number'
                    name='value'
                    value={resource.value}
                    className='small'
                    data-index={i}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <div className='_controls'>
                    {list.length > 1 && i !== 0 && (
                      <ArrowUp onClick={() => move(i)} />
                    )}
                    {list.length - 1 > i && (
                      <ArrowDown onClick={() => move(i, false)} />
                    )}
                    <Delete className='delete' onClick={() => deleteRes(i)} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Resources;
