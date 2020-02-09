import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Partials
import Table from 'components/partials/MainContent/rankings/Table';
import Loader from 'components/partials/Loader';

// Actions
import getCharacters from 'redux/actions/rankings/getCharacters';
import clearCharacters from 'redux/actions/rankings/clearCharacters';

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
  useEffect(() => {
    getCharacters();

    return () => clearCharacters();
  }, [getCharacters, clearCharacters]);

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

const mapStateToProps = (state: AppState) => ({
  characters: state.rankings.characters
});

export default connect(mapStateToProps, { getCharacters, clearCharacters })(
  Rankings
);
