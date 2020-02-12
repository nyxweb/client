import React from 'react';

// Partials
import TableRow from 'components/partials/MainContent/rankings/TableRow';

// Types
import Character from 'redux/types/rankings/Character';

interface Props {
  characters: Character[];
  page: number;
  setPage: Function;
}

const Table: React.FC<Props> = ({ characters, page, setPage }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>[guild] name</th>
          <th>class</th>
          <th>level</th>
          <th>hof</th>
          <th>pk</th>
          <th>quest</th>
          <th>mark</th>
        </tr>
      </thead>
      <tbody>
        {!characters ? (
          <tr>
            <td colSpan={8}>No results found</td>
          </tr>
        ) : (
          <>
            {characters.map((char: Character, i: number) => (
              <TableRow key={i} rank={i + 1 + (page - 1) * 20} char={char} />
            ))}
            <tr>
              <td colSpan={8}>
                {page > 1 && (
                  <button onClick={() => setPage(page - 1)}>prev</button>
                )}{' '}
                page: [{page}]{' '}
                <button onClick={() => setPage(page + 1)}>next</button>
              </td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
};

export default Table;
