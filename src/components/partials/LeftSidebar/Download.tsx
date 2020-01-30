import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Download: React.FC<Props> = () => {
  return (
    <div className='Download'>
      <Link to='/downloads'>
        <span>Descargar Cliente</span>y empieza a jugar!
      </Link>
    </div>
  );
};

export default Download;
