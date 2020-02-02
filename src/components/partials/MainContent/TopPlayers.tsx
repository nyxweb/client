import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const TopPlayers: React.FC<Props> = () => {
  return (
    <div className='TopPlayers'>
      <Character cClass='sm' wins={1} name='Dea7h' />
      <Character cClass='bk' wins={3} name='DarkMaster' />
      <Character cClass='elf' wins={5} name='r00tme' />
      <Character cClass='mg' wins={2} name='mistar_ti' />
      <Character cClass='dl' wins={4} name='radiPetrov' />
    </div>
  );
};

interface CharacterProps {
  cClass: string;
  name: string;
  wins: number;
}

const Character: React.FC<CharacterProps> = ({ cClass, name, wins }) => {
  const winsTranslate = (num: number) => {
    switch (num) {
      case 1:
        return 'one';
      case 2:
        return 'two';
      case 3:
        return 'three';
      case 4:
        return 'four';
      default:
        return 'five';
    }
  };

  return (
    <div className='frame'>
      <div className={`card ${cClass} ${winsTranslate(wins)}`} />
      <div className='name'>
        <Link to={`/char/${name}`}>{name}</Link>
      </div>
    </div>
  );
};

export default TopPlayers;
