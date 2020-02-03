import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { getTopCharacters } from 'redux/actions/characters';
import AppState from 'redux/types/app';
import { TopCharacter } from 'redux/types/Characters';

// Components
import Loader from 'react-loader-spinner';

// Helpers
import { shortClass } from 'helpers/characters/class';

interface Props {
  getTopCharacters: Function;
  topCharacters: TopCharacter[] | null;
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
        topCharacters.map((char: TopCharacter, i: number) => (
          <Character key={i} char={char} />
        ))
      )}
    </div>
  );
};

interface CharacterProps {
  char: TopCharacter;
}

const Character: React.FC<CharacterProps> = ({ char }) => {
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
    char['account.GameIDC'] === char.Name && char['status.ConnectStat'] === 1
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
