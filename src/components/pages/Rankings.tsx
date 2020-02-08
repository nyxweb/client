import React, { useState, useEffect } from 'react';

// Actions
import getCharacters from 'actions/rankings/getCharacters';

// Partials
import Table from 'components/partials/MainContent/rankings/Table';
import Loader from 'components/partials/Loader';

interface Props {}

const Rankings: React.FC<Props> = () => {
  const [characters, setCharacters] = useState();

  useEffect(() => {
    const fetchCharacters = async () => {
      setCharacters(await getCharacters());
    };

    fetchCharacters();
  }, []);

  return (
    <div className='Rankings'>
      {characters === undefined ? (
        <Loader />
      ) : (
        <Table characters={characters} />
      )}
    </div>
  );
};

export default Rankings;
