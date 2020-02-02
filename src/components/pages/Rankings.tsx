import React from 'react';

interface Props {}

const Rankings: React.FC<Props> = () => {
  return (
    <div className='Rankings'>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>class</th>
            <th>level</th>
            <th>guild</th>
          </tr>
        </thead>
        <tbody>
          <Character
            rank={1}
            name='Dea7h'
            cClass={1}
            level={400}
            reset={15}
            guild='Dryanovo'
          />
        </tbody>
      </table>
    </div>
  );
};

interface CharProps {
  rank: number;
  name: string;
  cClass: number;
  level: number;
  reset: number;
  guild: string;
}

const Character: React.FC<CharProps> = ({
  rank,
  name,
  cClass,
  level,
  reset,
  guild
}) => {
  return (
    <tr>
      <td>{rank}.</td>
      <td>{name}</td>
      <td>{cClass}</td>
      <td>
        {level}
        <sup>{reset}</sup>
      </td>
      <td>{guild}</td>
    </tr>
  );
};

export default Rankings;
