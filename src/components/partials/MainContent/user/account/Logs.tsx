import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';

// Partials
import Loader from 'components/partials/Loader';

// Actions
import { getLogs } from 'actions/user/account';

// Types
import AppState from 'redux/types/app';
import { CLEAR_LOGS } from 'redux/types/actions';

interface Props {}

const Logs: React.FC<Props> = () => {
  const { loading, logs } = useSelector(
    (state: AppState) => state.user.account
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogs());

    return () => {
      dispatch({
        type: CLEAR_LOGS
      });
    };
  }, []);

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
            {logs.map((log, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td style={{ textAlign: 'left' }}>
                  {log.module ? log.module : 'unknown'}
                </td>
                <td style={{ textAlign: 'left' }}>{log.message}</td>
                <td style={{ textAlign: 'right' }}>
                  <Moment fromNow unix>
                    {log.timestamp / 1000}
                  </Moment>
                </td>
                <td style={{ textAlign: 'right' }}>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='NoData'>No logs</div>
      )}
    </div>
  );
};

export default Logs;
