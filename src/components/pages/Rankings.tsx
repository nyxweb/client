import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// Partials
import Table from 'components/partials/MainContent/rankings/Table';
import Loader from 'components/partials/Loader';

// Actions
import { getCharacters, clearCharacters } from 'actions/rankings';

// Types
import AppState from 'redux/types/app';
import Character from 'redux/types/rankings/Character';

interface Props {
  characters: Character[];
  getCharacters: Function;
  clearCharacters: Function;
}

const Rankings: React.FC<Props> = ({
  characters,
  getCharacters,
  clearCharacters
}) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCharacters({ loader: setLoading, page });

    return () => clearCharacters();
  }, [page, getCharacters, clearCharacters]);

  return (
    <div className='Rankings'>
      {loading ? (
        <Loader />
      ) : (
        <Table characters={characters} page={page} setPage={setPage} />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  characters: state.rankings.characters
});

export default connect(mapStateToProps, { getCharacters, clearCharacters })(
  Rankings
);
