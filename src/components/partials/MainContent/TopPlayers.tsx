import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { getHof } from 'actions/rankings';
import AppState from 'redux/types/app';
import Character from 'redux/types/rankings/Character';

// Components
import ReactLoader from 'components/reusables/ReactLoader';

// Helpers
import { cclass, rankings } from 'helpers/characters';

interface Props {
  getHof: Function;
  hof: Character[] | null;
}

const TopPlayers: React.FC<Props> = ({ getHof, hof }) => {
  useEffect(() => {
    getHof();
  }, [getHof]);

  return (
    <div className='TopPlayers'>
      {!hof ? (
        hof === null ? (
          <ReactLoader />
        ) : (
          'Failed to load'
        )
      ) : hof.length ? (
        hof.map((char: Character, i: number) => (
          <CharacterCard key={i} char={char} />
        ))
      ) : (
        <div>No characters</div>
      )}
    </div>
  );
};

interface CharacterProps {
  char: Character;
}

const CharacterCard: React.FC<CharacterProps> = ({ char }) => {
  if (char) {
    const status =
      char.account.GameIDC === char.Name && char.status.ConnectStat === 1
        ? 'online'
        : 'offline';

    return (
      <div className='frame'>
        <div
          className={`card ${cclass.shortClass(
            char.Class
          )} ${rankings.winsTranslate(char.HOFWins)}`}
        />
        <div className={`name ${status}`}>
          <Link to={`/char/${char.Name}`}>{char.Name}</Link>
        </div>
      </div>
    );
  }

  return <div />;
};

const mapStateToProps = (state: AppState) => ({
  hof: state.rankings.hof
});

export default connect(mapStateToProps, { getHof })(TopPlayers);
