import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { match, Link } from 'react-router-dom';
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
import Pagination from 'components/reusables/Pagination';

interface Props {
  match: match<{ category: string }>;
}

const Logs: React.FC<Props> = ({
  match: {
    params: { category }
  }
}) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const {
    loading,
    logs: { list, count }
  } = useSelector((state: AppState) => state.user.account);
  const chars = useSelector((state: AppState) => state.user.character.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogs(page, perPage, category));
    dispatch(getChars());
  }, [dispatch, page, perPage, category]);

  return (
    <>
      <div className='Logs'>
        {loading ? (
          <Loader />
        ) : list ? (
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
              {list.map((log, i) => {
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
                        char={{
                          Name: match,
                          status: find ? find.status : false
                        }}
                        guild={false}
                        style={{ display: 'inline-block' }}
                      />
                    );
                  }
                );

                const module = log.module ? log.module : 'unknown';

                return (
                  <tr key={i}>
                    <td>{i + 1 + (page - 1) * perPage}</td>
                    <td>
                      <Link to={`/user/account/logs/${module}`}>{module}</Link>
                    </td>
                    <td style={{ textAlign: 'left' }}>{message}</td>
                    <td>
                      <Moment
                        style={{
                          display: 'inline-block',
                          whiteSpace: 'nowrap'
                        }}
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
      <Pagination
        page={page}
        perPage={perPage}
        totalItems={count || 0}
        setPage={setPage}
        setPerPage={setPerPage}
      />
    </>
  );
};

export default Logs;
