import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Icons
import { ReactComponent as Delete } from 'assets/icons/delete.svg';
import { ReactComponent as Add } from 'assets/icons/add.svg';
import { ReactComponent as ArrowUp } from 'assets/icons/arrow-up.svg';
import { ReactComponent as ArrowDown } from 'assets/icons/arrow-down.svg';
import { ReactComponent as Trash } from 'assets/icons/trash.svg';

// Reusales
import Button from 'components/reusables/form/Button';

// Actions
import { updateConfig } from 'actions/user/admin';

// Types
import AppState from 'redux/types/app';
import { notice } from 'actions/utils';

interface Props {}

const Events: React.FC<Props> = () => {
  const [list, setList] = useState<{ name: string; hours: string[] }[]>();

  const events = useSelector((state: AppState) => state.config.events);
  const dispatch = useDispatch();

  useEffect(() => {
    events && setList(events);
  }, [events]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...list];
    const index = Number(e.target.dataset.index);
    const hourIndex = Number(e.target.dataset.hour);

    if (e.target.name === 'hours') {
      updated[index].hours[hourIndex] = e.target.value;
    } else {
      updated[index].name = e.target.value;
    }

    setList(updated);
  };

  const addEvent = () => {
    const updated = [...list];
    updated.push({ name: '', hours: [''] });
    setList(updated);
  };

  const deleteEvent = (index: number) => {
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

  const deleteHour = (index: number, hourIndex: number) => {
    const updated = [...list];
    updated[index].hours.splice(hourIndex, 1);
    setList(updated);
  };

  const addHour = (index: number) => {
    const updated = [...list];
    updated[index].hours.push('');
    setList(updated);
  };

  const handleSave = () => {
    let weGood = true;

    if (list) {
      for (let event of list) {
        if (
          event.name.length === 0 ||
          event.hours.find(e => !/^\d{2}:\d{2}$/.test(e))
        ) {
          weGood = false;
          notice({
            error: 'Please double check the fields before saving.'
          });
          break;
        }
      }

      if (weGood) {
        dispatch(updateConfig('events', JSON.stringify(list)));
      }
    }
  };

  return (
    <div className='Events'>
      <div className='title'>
        <span className='new-event'>
          Events Configuration <Add className='add-icon' onClick={addEvent} />
        </span>
        <Button value='save changes' looks='green' onClick={handleSave} />
      </div>
      <table>
        <tbody>
          {list &&
            list.map((event, i) => (
              <tr key={i}>
                <td className='event-name'>
                  <input
                    type='text'
                    name='name'
                    data-index={i}
                    value={event.name}
                    onChange={handleChange}
                  />
                  <div className='controls'>
                    {list.length > 1 && i !== 0 && (
                      <ArrowUp className='arrow-up' onClick={() => move(i)} />
                    )}
                    {list.length - 1 !== i && (
                      <ArrowDown
                        className='arrow-down'
                        onClick={() => move(i, false)}
                      />
                    )}
                    <Trash className='trash' onClick={() => deleteEvent(i)} />
                  </div>
                </td>
                <td className='hoursList'>
                  {event.hours.map((h, o) => (
                    <div key={o} className='hour-box'>
                      <span className='index'>{o + 1}</span>
                      <input
                        key={i}
                        type='text'
                        name='hours'
                        data-index={i}
                        data-hour={o}
                        value={h}
                        onChange={handleChange}
                      />
                      <Delete
                        className='delete'
                        onClick={() => deleteHour(i, o)}
                      />
                    </div>
                  ))}
                  <Add className='add' onClick={() => addHour(i)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className='info'>
        <div>Make sure all hours are in format HH:MM</div>
        <div>
          Also make sure all hours are in order from low to high (for instance:
          (00:30, 02:30,... 23:30))
        </div>
      </div>
    </div>
  );
};

export default Events;
