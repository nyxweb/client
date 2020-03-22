import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Reusablesn
import Resource from 'components/reusables/particles/Resource';

// Helpers
import { count } from 'helpers/items';
import slotsMatrix, { multidimensionalSum } from 'helpers/items/slotsMatrix';

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
  const itemsDB = useSelector((state: AppState) => state.config.itemsList);
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

      const matrix = slotsMatrix(account.warehouse.items, itemsDB);

      setCounter(c => ({
        ...c,
        found: countItems,
        empty: 120 - multidimensionalSum(matrix)
      }));
    }
  }, [account, itemsDB]);

  const typer = (e: React.ChangeEvent<HTMLInputElement>, res: IResource) => {
    if (fields) {
      const value = Number(e.target.value);
      const index = fields.findIndex(
        r => r.group === res.group && r.id === res.id && r.level === res.level
      );

      const newTotalInput = counter.input - fields[index].value! + value;

      if (index >= 0 && value >= 0) {
        if (newTotalInput > counter.empty) {
          return notice({
            error: `You only have space for ${counter.empty} items.`
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

  const resetCounter = () => {
    setCounter({ ...counter, input: 0 });
    setFields(
      fields?.map(f => ({
        ...f,
        value: 0
      }))
    );
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
              onClick={() => {
                if (counter.input) {
                  resetCounter();
                  dispatch(deposit(fields));
                }
              }}
            />
            <Button
              value={`withdraw ( ${
                counter.input > counter.empty
                  ? `<font color='#ff8880'>${counter.input}</font>`
                  : counter.input
              }/${counter.empty} )`}
              tooltip='Withdraw selected resources'
              onClick={() => {
                if (counter.input && counter.input <= counter.empty) {
                  resetCounter();
                  dispatch(withdraw(fields));
                }
              }}
            />
            <Button
              value={`deposit all ( ${counter.found} )`}
              looks='green'
              tooltip='Deposit all available resources'
              onClick={() => {
                if (counter.found) {
                  resetCounter();
                  dispatch(deposit());
                }
              }}
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
