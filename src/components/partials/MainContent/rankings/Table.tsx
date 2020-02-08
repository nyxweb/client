import React from 'react';

// Partials
import TableRow from 'components/partials/MainContent/rankings/TableRow';

// Types
import Character from 'types/Character';

interface Props {
  characters: Character[];
}

const Table: React.FC<Props> = ({ characters }) => {
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
          characters.map((char: Character, i: number) => (
            <TableRow key={i} rank={i + 1} char={char} />
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
