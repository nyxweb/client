import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import reactStringReplace from 'react-string-replace';

// Partials
import Loader from 'components/partials/Loader';

// Actions
import { getLogs } from 'actions/user/account';

// Types
import AppState from 'redux/types/app';
import Item from 'components/reusables/particles/items/Item';

interface Props {}

const Logs: React.FC<Props> = () => {
  const { loading, logs } = useSelector(
    (state: AppState) => state.user.account
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogs());
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
                (match, i) => <Item key={i} hex={match} image={false} />
              );

              // Highlight of text
              message = reactStringReplace(
                message,
                /{highlight:([^}]+)}/gm,
                (match, i) => (
                  <span key={i} className='highlight'>
                    {match}
                  </span>
                )
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
                    >
                      {log.timestamp / 1000}
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
