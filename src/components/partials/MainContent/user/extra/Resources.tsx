import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Reusablesn
import Resource from 'components/reusables/particles/Resource';

// Helpers
import { count } from 'helpers/items';

// Actions
import { notice } from 'actions/utils';
import { deposit, withdraw } from 'actions/user/extra';

// Types
import AppState from 'redux/types/app';
import IResource from 'redux/types/reusables/Resource';
import Button from 'components/reusables/form/Button';
import Loader from 'components/partials/Loader';

interface Props {}

const Resources: React.FC<Props> = () => {
  const [resources, setResources] = useState<IResource[]>();
  const [fields, setFields] = useState<IResource[]>();
  const [counter, setCounter] = useState({
    found: 0,
    input: 0,
    empty: 0
  });

  const account = useSelector((state: AppState) => state.user.account.info);
  const loading = useSelector((state: AppState) => state.user.extra.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (account) {
      const allResources: IResource[] = JSON.parse(account.resources.list);
      setResources(allResources);

      let countItems = 0;
      setFields(
        allResources.map(r => {
          const found = count.items(account.warehouse.items, r);
          countItems += found;

          return {
            ...r,
            value: 0,
            found
          };
        })
      );

      setCounter(c => ({
        ...c,
        found: countItems,
        empty: count.emptySlots(account.warehouse.items)
      }));
    }
  }, [account]);

  const typer = (e: React.ChangeEvent<HTMLInputElement>, res: IResource) => {
    if (fields) {
      const value = Number(e.target.value);
      const index = fields.findIndex(
        r => r.group === res.group && r.id === res.id && r.level === res.level
      );

      const newTotalInput = counter.input - fields[index].value! + value;

      if (index >= 0 && value >= 0) {
        if (newTotalInput > 120) {
          return notice({
            error: 'You cannot withdraw more than 120 items.'
          });
        }

        const updated = [...fields];
        updated[index] = { ...updated[index], value };

        setFields(updated);
        setCounter({
          ...counter,
          input: newTotalInput
        });
      }
    }
  };

  return (
    <div className='Resources'>
      {loading ? (
        <Loader />
      ) : account && resources && fields && resources.length ? (
        <>
          {resources.map((res: IResource, i: number) => {
            const field = fields.find(
              r =>
                r.group === res.group &&
                r.id === res.id &&
                r.level === res.level
            );

            return (
              <div className='block' key={i}>
                <Resource
                  resource={res}
                  size={40}
                  style={{ fontSize: 15, float: 'none', margin: 0 }}
                />

                <div className='input'>
                  <input
                    type='number'
                    value={field && field.value ? field.value : ''}
                    onChange={e => typer(e, res)}
                  />
                  <span>
                    Found{' '}
                    <span className={field?.found ? 'highlight' : ''}>
                      {field?.found}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
          <div className='controls'>
            <Button
              value={`deposit ( ${counter.input} )`}
              tooltip='Deposit selected resources'
              onClick={() => counter.input && dispatch(deposit(fields))}
            />
            <Button
              value={`withdraw ( ${
                counter.input > counter.empty
                  ? `<font color='#ff8880'>${counter.input}</font>`
                  : counter.input
              }/${counter.empty} )`}
              tooltip='Withdraw selected resources'
              onClick={() =>
                counter.input &&
                counter.input <= counter.empty &&
                dispatch(withdraw(fields))
              }
            />
            <Button
              value={`deposit all ( ${counter.found} )`}
              looks='green'
              tooltip='Deposit all available resources'
              onClick={() => counter.found && dispatch(deposit())}
            />
          </div>
        </>
      ) : (
        'No resources found'
      )}
    </div>
  );
};

export default Resources;
