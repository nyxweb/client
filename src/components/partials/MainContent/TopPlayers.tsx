import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { getTopCharacters } from 'redux/actions/characters';
import AppState from 'redux/types/app';
import Character from 'types/Character';

// Components
import Loader from 'react-loader-spinner';

// Helpers
import { shortClass } from 'helpers/characters/class';

interface Props {
  getTopCharacters: Function;
  topCharacters: Character[] | null;
}

const TopPlayers: React.FC<Props> = ({ getTopCharacters, topCharacters }) => {
  useEffect(() => {
    getTopCharacters();
  }, [getTopCharacters]);

  return (
    <div className='TopPlayers'>
      {!topCharacters ? (
        <Loader type='Triangle' color='#00BFFF' height={50} width={50} />
      ) : (
        topCharacters.map((char: Character, i: number) => (
          <CharacterCard key={i} char={char} />
        ))
      )}
    </div>
  );
};

interface CharacterProps {
  char: Character;
}

const CharacterCard: React.FC<CharacterProps> = ({ char }) => {
  const winsTranslate = (num: number) => {
    switch (num) {
      case 0:
        return 'zero';
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

  const status =
    char.account.GameIDC === char.Name && char.status.ConnectStat === 1
      ? 'online'
      : 'offline';

  return (
    <div className='frame'>
      <div
        className={`card ${shortClass(char.Class)} ${winsTranslate(
          char.HOFWins
        )}`}
      />
      <div className={`name ${status}`}>
        <Link to={`/char/${char.Name}`}>{char.Name}</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  topCharacters: state.characters.topCharacters
});

export default connect(mapStateToProps, { getTopCharacters })(TopPlayers);
