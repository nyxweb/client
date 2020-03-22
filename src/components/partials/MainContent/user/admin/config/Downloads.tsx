import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'uuid';

// Icons
import { ReactComponent as Delete } from 'assets/icons/delete.svg';
import { ReactComponent as Add } from 'assets/icons/add.svg';
import { ReactComponent as ArrowUp } from 'assets/icons/arrow-up.svg';
import { ReactComponent as ArrowDown } from 'assets/icons/arrow-down.svg';

// Reusales
import Button from 'components/reusables/form/Button';

// Actions
import { updateConfig } from 'actions/user/admin';

// Types
import AppState from 'redux/types/app';
import Moment from 'react-moment';

interface IDownload {
  name: string;
  sound: boolean;
  host: string;
  size: string;
  upload: number;
  link: string;
  [key: string]: any;
}

interface Props {}

const Downloads: React.FC<Props> = () => {
  const [list, setList] = useState<IDownload[]>();

  const downloads = useSelector((state: AppState) => state.config.downloads);
  const dispatch = useDispatch();

  useEffect(() => {
    downloads && setList(downloads);
  }, [downloads]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sound = false
  ) => {
    const updated = [...list];
    const index = Number(e.target.dataset.index);
    if (sound) {
      updated[index].sound = !updated[index].sound;
    } else {
      updated[index][e.target.name] = e.target.value;
    }

    updated[index].upload = Math.floor(Date.now() / 1000);
    setList(updated);
  };

  const addDownload = () => {
    const updated = [...list];
    updated.push({
      name: '',
      sound: true,
      host: '',
      size: '',
      upload: Math.floor(Date.now() / 1000),
      link: ''
    });
    setList(updated);
  };

  const remove = (index: number) => {
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
      dispatch(updateConfig('downloads', JSON.stringify(list)));
    }
  };

  return (
    <div className='Downloads'>
      <div className='title'>
        <span className='new-download'>
          Download Links
          <Add className='add-icon' onClick={addDownload} />
        </span>
        <Button value='save changes' looks='green' onClick={handleSave} />
      </div>
      <table>
        <tbody>
          {list &&
            list.map((down, i) => (
              <Fragment key={uuid()}>
                <tr>
                  <td rowSpan={2}>{i + 1}</td>
                  <td>
                    <input
                      type='text'
                      name='name'
                      data-index={i}
                      value={down.name}
                      onChange={handleChange}
                      placeholder='Name'
                    />
                  </td>
                  <td>
                    <input
                      type='checkbox'
                      name='sound'
                      data-index={i}
                      checked={down.sound}
                      onChange={e => handleChange(e, true)}
                      placeholder='Sound on/off'
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      name='host'
                      data-index={i}
                      value={down.host}
                      onChange={handleChange}
                      placeholder='Host Name'
                    />
                  </td>
                  <td rowSpan={2}>
                    <div className='_controls'>
                      {list.length > 1 && i !== 0 && (
                        <ArrowUp onClick={() => move(i)} />
                      )}
                      {list.length - 1 > i && (
                        <ArrowDown onClick={() => move(i, false)} />
                      )}
                      <Delete className='delete' onClick={() => remove(i)} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type='text'
                      name='size'
                      data-index={i}
                      value={down.size}
                      onChange={handleChange}
                      placeholder='Files Size'
                    />
                  </td>
                  <td>
                    <Moment unix fromNow>
                      {down.upload}
                    </Moment>
                  </td>
                  <td>
                    <input
                      type='text'
                      name='link'
                      data-index={i}
                      value={down.link}
                      onChange={handleChange}
                      placeholder='Link to the files'
                    />
                  </td>
                </tr>
              </Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Downloads;
