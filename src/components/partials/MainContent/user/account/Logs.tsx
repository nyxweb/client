import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import reactStringReplace from 'react-string-replace';
import uuid from 'uuid/v4';

// Partials
import Loader from 'components/partials/Loader';

// Actions
import { getLogs } from 'actions/user/account';
import { getChars } from 'actions/user/character';

// Types
import AppState from 'redux/types/app';
import Item from 'components/reusables/particles/items/Item';
import Name from 'components/partials/Character/Name';

interface Props {}

const Logs: React.FC<Props> = () => {
  const { loading, logs } = useSelector(
    (state: AppState) => state.user.account
  );
  const chars = useSelector((state: AppState) => state.user.character.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogs());
    dispatch(getChars());
  }, [dispatch]);

  return (
    <div className='Logs'>
      {loading ? (
        <Loader />
      ) : logs ? (
        <table className='Table'>
          <thead>
            <tr>
              <th>#</th>
              <th>module</th>
              <th>log</th>
              <th>time</th>
              <th>ip</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => {
              // Items
              let message = reactStringReplace(
                log.message,
                /{item:([^}]{32})}/gim,
                match => (
                  <Item
                    key={uuid()}
                    hex={match}
                    image={false}
                    style={{ display: 'inline-block' }}
                  />
                )
              );

              // Highlight of text
              message = reactStringReplace(
                message,
                /{highlight:([^}]+)}/gm,
                match => (
                  <span key={uuid()} className='highlight'>
                    {match}
                  </span>
                )
              );

              // Character Names
              message = reactStringReplace(
                message,
                /{char:([^}]+)}/gm,
                match => {
                  const find = chars && chars.find(c => c.Name === match);
                  return (
                    <Name
                      key={uuid()}
                      char={{ Name: match, status: find ? find.status : false }}
                      guild={false}
                      style={{ display: 'inline-block' }}
                    />
                  );
                }
              );

              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{log.module ? log.module : 'unknown'}</td>
                  <td style={{ textAlign: 'left' }}>{message}</td>
                  <td>
                    <Moment
                      style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
                      fromNow
                      unix
                      withTitle
                    >
                      {Math.floor(log.timestamp / 1000)}
                    </Moment>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{log.ip}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className='NoData'>No logs</div>
      )}
    </div>
  );
};

export default Logs;
